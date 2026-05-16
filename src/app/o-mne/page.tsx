import type { Metadata } from "next";
import Link from "next/link";
import { CodebaseMap } from "@/components/CodebaseMap";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { APP_VERSION_LABEL, GITHUB_URL } from "@/lib/version";

export const metadata: Metadata = {
  title: "O mně",
  description:
    "Kdo je Martin Baránek, proč vznikla tato kalkulačka a jak je celý projekt technicky postavený.",
};

const PICK_PACKAGE = `export function pickPackage(
  neededVcpu: number,
  neededRamGB: number,
  provider: Provider,
  rates: ExchangeRate,
): { pkg: ProviderPackage | null; insufficient: boolean } {
  const fitting = provider.packages.filter(
    (p) => p.vcpu >= neededVcpu && p.ramGB >= neededRamGB,
  );

  if (fitting.length > 0) {
    const cheapest = fitting.reduce((best, p) =>
      toCZK(p.price, rates) < toCZK(best.price, rates) ? p : best,
    );
    return { pkg: cheapest, insufficient: false };
  }

  // Nothing fits — return the largest package so the UI can show a warning.
  const largest = provider.packages.reduce((best, p) =>
    p.vcpu > best.vcpu || (p.vcpu === best.vcpu && p.ramGB > best.ramGB)
      ? p
      : best,
  );
  return { pkg: largest, insufficient: true };
}`;

const STACK = [
  { name: "Next.js 16", note: "App Router · static export" },
  { name: "TypeScript", note: "strict mode" },
  { name: "Tailwind CSS v4", note: "Material 3 design tokens" },
  { name: "Cloudflare Pages", note: "hosting + CDN + DDoS" },
  { name: "GitHub Actions", note: "týdenní refresh cen" },
];

export default function OMnePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-outline-variant">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="text-label-lg uppercase tracking-wider text-on-surface-variant">
              O autorovi
            </div>
            <h1 className="mt-2 text-display-sm sm:text-display-md font-semibold tracking-tight text-on-surface">
              Proč jsem tu kalkulačku postavil
            </h1>
          </div>
        </section>

        {/* About */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-5 text-body-lg text-on-surface-variant leading-relaxed">
          {/* Positioning lead — Martin's broader value-prop, calculator
              is just one example of his work. */}
          <div className="relative pl-6 -mx-2 py-2 border-l-4 border-primary bg-primary-container/30 rounded-r-lg">
            <p className="text-title-lg text-on-surface leading-snug">
              <strong>
                Vytvářím AI-powered systémy, které firmám šetří čas, peníze a
                nervy.
              </strong>{" "}
              <span className="text-on-surface-variant">
                Propojuji AI agenty, cloud infrastrukturu, automatizace a
                vlastní nástroje (jako tahle kalkulačka hostingu) do jednoho
                ekosystému — od první analýzy po nasazení a provoz.
              </span>
            </p>
          </div>

          <p>
            Jsem <strong className="text-on-surface">Martin Baránek</strong> —
            DevOps inženýr a Linux administrátor. Stavím a provozuji
            infrastrukturu pro menší české firmy — od jednoho dobře
            nastaveného VPS po cloud automatizace s AI agenty. Tahle
            kalkulačka je jen jedna z věcí, které k tomu používám; širší
            přehled mojí práce najdete na{" "}
            <a
              href="https://baranekm.cz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              baranekm.cz
            </a>
            .
          </p>
          <p>
            Kalkulačka vznikla z opakované zkušenosti: klient přijde s AWS
            účtem za desítky tisíc Kč měsíčně a po hodině přepočtů zjistíme,
            že stejnou službu by na Hetzneru nebo MasterDC provozoval za
            zlomek ceny — bez ztráty výkonu nebo dostupnosti.
          </p>
          <p>
            Cílem tohohle nástroje není AWS pohřbít. Cílem je dát malé firmě
            upřímnou odpověď na otázku{" "}
            <em className="text-on-surface">„kolik mě to bude stát&ldquo;</em>{" "}
            předtím, než utratí čas a peníze za něco, co možná vůbec
            nepotřebuje.
          </p>

          <Card variant="filled" className="mt-6 p-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="https://baranekm.cz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-label-lg text-primary hover:underline inline-flex items-center gap-1"
            >
              baranekm.cz <span aria-hidden>↗</span>
            </a>
            <a
              href="mailto:martin.baranek@outlook.com"
              className="text-label-lg text-primary hover:underline"
            >
              martin.baranek@outlook.com
            </a>
            <span className="text-label-md text-on-surface-variant">
              Konzultace cloud / hosting pro malé české firmy
            </span>
          </Card>
        </section>

        {/* Under the hood */}
        <section className="border-t border-outline-variant bg-surface-low">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
            <div className="flex items-baseline justify-between gap-4 mb-2 flex-wrap">
              <div>
                <div className="text-label-lg uppercase tracking-wider text-on-surface-variant">
                  Pod kapotou
                </div>
                <h2 className="mt-2 text-headline-md text-on-surface tracking-tight">
                  Jak je projekt postavený
                </h2>
              </div>
              <Chip tone="primary">{APP_VERSION_LABEL}</Chip>
            </div>
            <p className="text-body-lg text-on-surface-variant mt-4">
              Kalkulačka je open-source. Veškerý kód i datový soubor s cenami
              jsou veřejně dostupné — můžete si ověřit, podle čeho přesně se
              výsledek počítá.
            </p>

            <h3 className="mt-8 mb-3 text-title-lg text-on-surface">
              Stack
            </h3>
            <ul className="space-y-1.5">
              {STACK.map((s) => (
                <li
                  key={s.name}
                  className="flex flex-wrap items-baseline gap-x-2 text-body-md"
                >
                  <span className="font-mono text-on-surface">{s.name}</span>
                  <span className="text-on-surface-variant">— {s.note}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 mb-4 text-title-lg text-on-surface">
              Mapa projektu
            </h3>
            <CodebaseMap />

            <h3 className="mt-8 mb-3 text-title-lg text-on-surface">
              Srdce výpočtu
            </h3>
            <p className="text-body-md text-on-surface-variant mb-3">
              Kalkulačka odhadne potřebný počet vCPU a paměti, pak pro
              každého poskytovatele vybere nejlevnější balíček, který tyto
              požadavky splní. Klíčová funkce z{" "}
              <code className="font-mono text-on-surface bg-surface-container px-1 py-0.5 rounded">
                src/lib/calculator.ts
              </code>
              :
            </p>
            <Card variant="filled" className="p-0 overflow-hidden">
              <pre className="text-label-md font-mono p-4 overflow-x-auto leading-relaxed text-on-surface">
                <code>{PICK_PACKAGE}</code>
              </pre>
            </Card>

            <h3 className="mt-8 mb-3 text-title-lg text-on-surface">
              Aktualizace cen
            </h3>
            <p className="text-body-md text-on-surface-variant">
              Každé pondělí ráno se ceny automaticky obnovují: AWS přes{" "}
              <a
                href="https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/price-changes.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Bulk Pricing API
              </a>
              , čeští poskytovatelé scrapem ceníkové stránky. Ceny Hetzner
              Cloud aktualizuji ručně (jejich pricing endpoint vyžaduje
              auth token a samotná pricing stránka je JS-rendered; ceny se
              u Hetzneru navíc mění zřídka). Pokud GitHub Action najde
              změnu, otevře pull request s diffem cen, který si autor sám
              zkontroluje a smergne.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-primary text-on-primary text-label-lg shadow-elev-1 hover:shadow-elev-2 transition-shadow md-state-layer"
              >
                <span aria-hidden>⌥</span> Kód na GitHubu
                <span aria-hidden>↗</span>
              </a>
              <Link
                href="/#kalkulacka"
                className="text-label-lg text-primary hover:underline"
              >
                ← Zpět na kalkulačku
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
