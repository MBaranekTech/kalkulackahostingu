/**
 * Weekly price refresher for data/providers.json.
 *
 * - AWS: Bulk Pricing API (https://pricing.us-east-1.amazonaws.com/...) — exact
 *   on-demand Linux prices for the EC2 instance types listed in providers.json.
 *   The pricing JSON is ~150 MB; run with --max-old-space-size=4096.
 * - Hetzner: official cloud API (api.hetzner.cloud/v1/server_types), no auth.
 * - MasterDC / Forpsi: HTML scrape using a label-anchored regex. Brittle by
 *   nature — failure surfaces in the per-package error list and the workflow
 *   opens an issue rather than a PR.
 * - Exchange rates: ECB daily reference XML.
 *
 * The script mutates a copy of data/providers.json in place. If validation
 * fails, the original file is left untouched and the process exits non-zero.
 */
import fs from "node:fs/promises";
import path from "node:path";
import type {
  Money,
  Provider,
  ProviderPackage,
  ProvidersDataFile,
} from "../src/lib/types";

const DATA_PATH = path.resolve(process.cwd(), "data/providers.json");
const SUMMARY_PATH = path.resolve(process.cwd(), ".fetch-summary.json");
const TODAY = new Date().toISOString().slice(0, 10);

const UA =
  "KalkulackaHostingu price-fetcher (+https://kalkulackahostingu.cz)";

interface FetcherResult {
  provider: string;
  updated: string[];
  skipped: string[];
  errors: string[];
}

function emptyResult(provider: string): FetcherResult {
  return { provider, updated: [], skipped: [], errors: [] };
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) {
    throw new Error(`${url} → HTTP ${res.status}`);
  }
  return (await res.json()) as T;
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) {
    throw new Error(`${url} → HTTP ${res.status}`);
  }
  return await res.text();
}

// --- AWS EC2 + RDS ------------------------------------------------------

interface AwsPricingFile {
  products: Record<
    string,
    { attributes?: Record<string, string> } | undefined
  >;
  terms: {
    OnDemand: Record<
      string,
      Record<
        string,
        {
          priceDimensions: Record<
            string,
            { pricePerUnit: { USD?: string } }
          >;
        }
      >
    >;
  };
}

async function applyAws(provider: Provider): Promise<FetcherResult> {
  const result = emptyResult("aws");

  const ec2Url =
    "https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonEC2/current/eu-central-1/index.json";
  console.log(`AWS: fetching EC2 pricing (large file ~150 MB)…`);
  const ec2 = await fetchJson<AwsPricingFile>(ec2Url);

  const wanted = new Map<string, ProviderPackage>();
  for (const pkg of provider.packages) {
    const m = pkg.name.match(/EC2\s+(\S+)/);
    if (m) wanted.set(m[1], pkg);
  }

  const found = new Map<string, number>();
  for (const [sku, product] of Object.entries(ec2.products)) {
    const a = product?.attributes;
    if (!a) continue;
    if (!wanted.has(a.instanceType ?? "")) continue;
    if (a.tenancy !== "Shared") continue;
    if (a.operatingSystem !== "Linux") continue;
    if (a.preInstalledSw !== "NA") continue;
    if (a.capacitystatus !== "Used") continue;

    const onDemand = ec2.terms.OnDemand[sku];
    if (!onDemand) continue;
    const term = Object.values(onDemand)[0];
    const dim = Object.values(term.priceDimensions)[0];
    const usdPerHour = parseFloat(dim.pricePerUnit.USD ?? "");
    if (!Number.isFinite(usdPerHour) || usdPerHour <= 0) continue;
    // AWS treats a month as 730 hours for monthly pricing comparisons.
    found.set(a.instanceType!, usdPerHour * 730);
  }

  for (const pkg of provider.packages) {
    const m = pkg.name.match(/EC2\s+(\S+)/);
    if (!m) {
      result.skipped.push(`${pkg.id}: no EC2 instance type in name`);
      continue;
    }
    const instType = m[1];
    const price = found.get(instType);
    if (price == null) {
      result.errors.push(`${pkg.id} (${instType}): not found in EC2 pricing`);
      continue;
    }
    pkg.price = {
      amount: Number(price.toFixed(2)),
      currency: "USD",
    };
    pkg.source = { url: ec2Url, fetchedAt: TODAY };
    result.updated.push(`${pkg.id} → $${price.toFixed(2)}/mo`);
  }

  // RDS managed DB — db.t3.micro instance fee + gp3 storage rate.
  if (provider.managedDb) {
    const rdsUrl =
      "https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonRDS/current/eu-central-1/index.json";
    console.log(`AWS: fetching RDS pricing…`);
    try {
      const rds = await fetchJson<AwsPricingFile>(rdsUrl);
      let instancePrice: number | null = null;
      let storagePrice: number | null = null;

      for (const [sku, product] of Object.entries(rds.products)) {
        const a = product?.attributes;
        if (!a) continue;

        if (
          instancePrice == null &&
          a.instanceType === "db.t3.micro" &&
          a.databaseEngine === "MySQL" &&
          a.deploymentOption === "Single-AZ"
        ) {
          const term = Object.values(rds.terms.OnDemand[sku] ?? {})[0];
          if (term) {
            const dim = Object.values(term.priceDimensions)[0];
            const usdPerHour = parseFloat(dim.pricePerUnit.USD ?? "");
            if (Number.isFinite(usdPerHour) && usdPerHour > 0) {
              instancePrice = usdPerHour * 730;
            }
          }
        }

        // The regional pricing JSON drops the `productFamily` attribute, so
        // we anchor on volumeType + engine + deployment instead — those are
        // present and uniquely identify the GP3 storage SKU for MySQL.
        if (
          storagePrice == null &&
          a.volumeType === "General Purpose-GP3" &&
          a.databaseEngine === "MySQL" &&
          a.deploymentOption === "Single-AZ"
        ) {
          const term = Object.values(rds.terms.OnDemand[sku] ?? {})[0];
          if (term) {
            const dim = Object.values(term.priceDimensions)[0];
            const usd = parseFloat(dim.pricePerUnit.USD ?? "");
            if (Number.isFinite(usd) && usd > 0) storagePrice = usd;
          }
        }
      }

      if (instancePrice != null) {
        provider.managedDb.baseFee = {
          amount: Number(instancePrice.toFixed(2)),
          currency: "USD",
        };
        result.updated.push(
          `managedDb.baseFee → $${instancePrice.toFixed(2)}/mo`,
        );
      } else {
        result.errors.push("managedDb.baseFee: db.t3.micro MySQL not found");
      }

      if (storagePrice != null) {
        provider.managedDb.perGB = {
          amount: Number(storagePrice.toFixed(4)),
          currency: "USD",
        };
        result.updated.push(
          `managedDb.perGB → $${storagePrice.toFixed(4)}/GB-mo`,
        );
      } else {
        result.errors.push(
          "managedDb.perGB: RDS GP3 storage rate not found",
        );
      }

      provider.managedDb.source = { url: rdsUrl, fetchedAt: TODAY };
    } catch (err) {
      result.errors.push(`RDS fetch: ${(err as Error).message}`);
    }
  }

  return result;
}

// --- Hetzner Cloud ------------------------------------------------------

interface HetznerServerType {
  id: number;
  name: string;
  cores: number;
  memory: number;
  disk: number;
  prices: Array<{
    location: string;
    price_monthly: { gross: string; net: string };
  }>;
}
interface HetznerResponse {
  server_types: HetznerServerType[];
}

async function applyHetzner(provider: Provider): Promise<FetcherResult> {
  const result = emptyResult("hetzner");
  const url = "https://api.hetzner.cloud/v1/server_types";
  console.log(`Hetzner: fetching ${url}…`);
  const data = await fetchJson<HetznerResponse>(url);

  const byName = new Map<string, HetznerServerType>();
  for (const t of data.server_types) byName.set(t.name.toLowerCase(), t);

  for (const pkg of provider.packages) {
    // Names like "CCX13 (dedicated vCPU)" or "CX22" → strip suffix.
    const m = pkg.name.match(/^([A-Za-z0-9]+)/);
    if (!m) {
      result.skipped.push(`${pkg.id}: cannot extract server type name`);
      continue;
    }
    const typeName = m[1].toLowerCase();
    const type = byName.get(typeName);
    if (!type) {
      result.errors.push(`${pkg.id} (${m[1]}): not in /v1/server_types`);
      continue;
    }
    // Falkenstein (fsn1) by default; fall back to first listed location.
    const loc = type.prices.find((p) => p.location === "fsn1") ?? type.prices[0];
    const net = parseFloat(loc.price_monthly.net);
    if (!Number.isFinite(net) || net <= 0) {
      result.errors.push(`${pkg.id}: invalid Hetzner price ${loc.price_monthly.net}`);
      continue;
    }
    pkg.price = { amount: Number(net.toFixed(2)), currency: "EUR" };
    pkg.source = { url, fetchedAt: TODAY };
    result.updated.push(`${pkg.id} → €${net.toFixed(2)}/mo`);
  }

  return result;
}

// --- HTML scrape helper -------------------------------------------------

/**
 * Find a "<digits> Kč" amount near `label` in the HTML. Returns null when
 * the label isn't present or no plausible price is found within the window.
 */
function scrapeCzkPriceNearLabel(html: string, label: string): number | null {
  const lower = html.toLowerCase();
  const idx = lower.indexOf(label.toLowerCase());
  if (idx < 0) return null;
  const window = html.slice(idx, idx + 1500);
  // Match e.g. "323 Kč", "1 149 Kč", "1.149 Kč", "1 149,00 Kč".
  const re = /([0-9][\d \s.,]*?\d|[0-9])\s*Kč/;
  const m = window.match(re);
  if (!m) return null;
  const cleaned = m[1]
    .replace(/[\s ]/g, "")
    .replace(/\.(?=\d{3}(\D|$))/g, "")
    .replace(",", ".");
  const num = parseFloat(cleaned);
  if (!Number.isFinite(num) || num < 10 || num > 1_000_000) return null;
  return Math.round(num);
}

// --- MasterDC -----------------------------------------------------------

async function applyMasterDC(provider: Provider): Promise<FetcherResult> {
  const result = emptyResult("masterdc");
  const url = "https://www.master.cz/virtualni-servery-vps/";
  console.log(`MasterDC: scraping ${url}…`);
  const html = await fetchText(url);

  // MasterDC dropped named tiers; the page now shows only "od X Kč" entry
  // prices for two platforms (KVM, Hyper-V). The bare strings "KVM" /
  // "Hyper-V" appear all over the page (meta tags, breadcrumbs, body copy)
  // — anchor instead on the platform subheading element that sits at the
  // top of each price card, then strip HTML so the "od ... <strong>N</strong>
  // ... Kč" split-across-tags pattern collapses to plain text.
  function odPriceNear(anchor: string): number | null {
    const idx = html.indexOf(anchor);
    if (idx < 0) return null;
    const window = html.slice(idx, idx + 20000).replace(/<[^>]+>/g, " ");
    const m = window.match(/od\s+([0-9][\d \s.,]*?\d|[0-9])\s*Kč/i);
    if (!m) return null;
    const cleaned = m[1]
      .replace(/[\s ]/g, "")
      .replace(/\.(?=\d{3}(\D|$))/g, "")
      .replace(",", ".");
    const num = parseFloat(cleaned);
    if (!Number.isFinite(num) || num < 10 || num > 1_000_000) return null;
    return Math.round(num);
  }

  for (const pkg of provider.packages) {
    const anchor =
      pkg.id === "masterdc-kvm-start"
        ? 'class="subheading">KVM</div>'
        : 'class="subheading">Hyper-V</div>';
    const price = odPriceNear(anchor);
    if (price == null) {
      result.errors.push(
        `${pkg.id} (${pkg.name}): "od X Kč" near platform subheading not found`,
      );
      continue;
    }
    pkg.price = { amount: price, currency: "CZK" };
    pkg.source = { url, fetchedAt: TODAY };
    result.updated.push(`${pkg.id} → od ${price} Kč/mo`);
  }
  return result;
}

// --- Forpsi -------------------------------------------------------------

async function applyForpsi(provider: Provider): Promise<FetcherResult> {
  const result = emptyResult("forpsi");
  const url = "https://www.forpsi.com/virtual/";
  console.log(`Forpsi: scraping ${url}…`);
  const html = await fetchText(url);

  // Forpsi tier names like "Basic" and "Standard" appear earlier in the
  // page's top navigation (shared webhosting links), so a bare-name anchor
  // grabs the wrong region. Each VPS price card has the tier name in an
  // `<h3>` heading — that closing tag is a unique anchor. Linux pricing is
  // listed before Windows in every card, so the first Kč match after the
  // heading is always the Linux price.
  for (const pkg of provider.packages) {
    const anchor = `>${pkg.name}</h3>`;
    const price = scrapeCzkPriceNearLabel(html, anchor);
    if (price == null) {
      result.errors.push(`${pkg.id} (${pkg.name}): not found in HTML`);
      continue;
    }
    pkg.price = { amount: price, currency: "CZK" };
    pkg.source = { url, fetchedAt: TODAY };
    result.updated.push(`${pkg.id} → ${price} Kč/mo`);
  }
  return result;
}

// --- ECB exchange rates -------------------------------------------------

async function fetchEcbRates(): Promise<{
  EUR_CZK: number;
  USD_CZK: number;
}> {
  const url = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml";
  console.log(`ECB: fetching ${url}…`);
  const xml = await fetchText(url);
  const usdMatch = xml.match(/currency=['"]USD['"]\s+rate=['"]([\d.]+)['"]/);
  const czkMatch = xml.match(/currency=['"]CZK['"]\s+rate=['"]([\d.]+)['"]/);
  if (!usdMatch || !czkMatch) {
    throw new Error("ECB XML missing USD or CZK rate");
  }
  const usdPerEur = parseFloat(usdMatch[1]);
  const czkPerEur = parseFloat(czkMatch[1]);
  if (
    !Number.isFinite(usdPerEur) ||
    !Number.isFinite(czkPerEur) ||
    usdPerEur <= 0 ||
    czkPerEur <= 0
  ) {
    throw new Error("ECB XML returned non-positive rates");
  }
  return {
    EUR_CZK: Number(czkPerEur.toFixed(3)),
    USD_CZK: Number((czkPerEur / usdPerEur).toFixed(3)),
  };
}

// --- Validation ---------------------------------------------------------

function validate(data: ProvidersDataFile): string[] {
  const errors: string[] = [];
  const okCur: Money["currency"][] = ["USD", "EUR", "CZK"];
  if (!(data.exchangeRate.EUR_CZK > 0) || !(data.exchangeRate.USD_CZK > 0)) {
    errors.push("exchangeRate has non-positive values");
  }
  for (const p of data.providers) {
    if (p.packages.length === 0) {
      errors.push(`${p.id}: no packages`);
      continue;
    }
    for (const pkg of p.packages) {
      if (!(pkg.price.amount > 0)) {
        errors.push(`${p.id}/${pkg.id}: price.amount must be > 0`);
      }
      if (!okCur.includes(pkg.price.currency)) {
        errors.push(`${p.id}/${pkg.id}: bad currency ${pkg.price.currency}`);
      }
      if (!pkg.source.url || !pkg.source.fetchedAt) {
        errors.push(`${p.id}/${pkg.id}: missing source.url or fetchedAt`);
      }
    }
  }
  return errors;
}

// --- Main ---------------------------------------------------------------

async function main() {
  const raw = await fs.readFile(DATA_PATH, "utf8");
  const data = JSON.parse(raw) as ProvidersDataFile;

  const results: FetcherResult[] = [];
  let anySucceeded = false;

  // Exchange rates first — both AWS (USD) and Hetzner (EUR) need them at
  // calculation time, so a stale rate quietly skews everything.
  try {
    data.exchangeRate = await fetchEcbRates();
    console.log(
      `exchangeRate: EUR_CZK=${data.exchangeRate.EUR_CZK}, USD_CZK=${data.exchangeRate.USD_CZK}`,
    );
    anySucceeded = true;
  } catch (err) {
    console.error(`exchangeRate: ${(err as Error).message}`);
    results.push({
      provider: "exchangeRate",
      updated: [],
      skipped: [],
      errors: [(err as Error).message],
    });
  }

  for (const provider of data.providers) {
    let result: FetcherResult;
    try {
      switch (provider.id) {
        case "aws":
          result = await applyAws(provider);
          break;
        case "hetzner":
          result = await applyHetzner(provider);
          break;
        case "masterdc":
          result = await applyMasterDC(provider);
          break;
        case "forpsi":
          result = await applyForpsi(provider);
          break;
      }
      if (result.updated.length > 0) anySucceeded = true;
    } catch (err) {
      result = {
        provider: provider.id,
        updated: [],
        skipped: [],
        errors: [`fetcher crashed: ${(err as Error).message}`],
      };
    }
    results.push(result);
  }

  data.lastUpdated = TODAY;

  const validationErrors = validate(data);
  if (validationErrors.length > 0) {
    console.error("\nValidation failed — refusing to write providers.json:");
    for (const e of validationErrors) console.error(`  ${e}`);
    await fs.writeFile(
      SUMMARY_PATH,
      JSON.stringify({ results, validationErrors }, null, 2),
      "utf8",
    );
    process.exit(2);
  }

  await fs.writeFile(
    DATA_PATH,
    JSON.stringify(data, null, 2) + "\n",
    "utf8",
  );

  console.log("\nSummary:");
  for (const r of results) {
    console.log(
      `  ${r.provider}: ${r.updated.length} updated, ${r.skipped.length} skipped, ${r.errors.length} errors`,
    );
    for (const u of r.updated) console.log(`    OK    ${u}`);
    for (const s of r.skipped) console.log(`    SKIP  ${s}`);
    for (const e of r.errors) console.log(`    ERROR ${e}`);
  }

  await fs.writeFile(
    SUMMARY_PATH,
    JSON.stringify({ results, validationErrors: [] }, null, 2),
    "utf8",
  );

  if (!anySucceeded) {
    console.error("\nNo fetcher produced any update.");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
