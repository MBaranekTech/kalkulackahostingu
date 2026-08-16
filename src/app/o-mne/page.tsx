import type { Metadata } from "next";
import Link from "next/link";
import { CodebaseMap } from "@/components/CodebaseMap";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { APP_VERSION_LABEL, GITHUB_URL } from "@/lib/version";
import {
  AUTHOR_NAME,
  AUTHOR_URL,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/seo";

const description =
  "Martin Baránek je DevOps inženýr a Linux administrátor. Pomáhá českým firmám s hostingem, cloudovou infrastrukturou, automatizací a optimalizací nákladů.";

export const metadata: Metadata = {
  title: "Martin Baránek – DevOps, Linux a cloud infrastruktura",
  description,
  alternates: { canonical: "/o-mne/" },
  openGraph: {
    title: "Martin Baránek – DevOps, Linux a cloud infrastruktura",
    description,
    url: absoluteUrl("/o-mne/"),
    type: "website",
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${absoluteUrl("/o-mne/")}#profile`,
  url: absoluteUrl("/o-mne/"),
  name: "O Martinu Baránkovi",
  description,
  inLanguage: "cs-CZ",
  isPartOf: {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
  },
  mainEntity: {
    "@type": "Person",
    "@id": `${AUTHOR_URL}/#person`,
    name: AUTHOR_NAME,
    url: AUTHOR_URL,
    email: "mailto:martin.baranek@outlook.com",
    jobTitle: "DevOps inženýr a Linux administrátor",
    sameAs: [AUTHOR_URL, GITHUB_URL],
    knowsAbout: [
      "DevOps",
      "Linux",
      "Cloud infrastructure",
      "Web hosting",
      "AWS cost optimization",
      "Infrastructure automation",
    ],
  },
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
  { name: "Tailwind CSS v4", note: "vlastní translucent design tokens" },
  { name: "Cloudflare Pages", note: "hosting + CDN + DDoS" },
  { name: "GitHub Actions", note: "týdenní refresh cen" },
];

export default function OMnePage() {
  return (
    <>
      <JsonLd data={aboutJsonLd} />
      <Header />
      <main className="flex-1">
        <section className="px-4 sm:px-6 pt-8 sm:pt-12">
          <div className="max-w-3xl mx-auto rounded-xl border border-outline-variant/60 bg-surface/78 shadow-elev-2 backdrop-blur-xl px-5 sm:px-10 py-10 sm:py-14 text-center">
            <div className="text-label-md text-primary">
              Martin Baránek / DevOps / Linux
            </div>
            <h1 className="mt-4 text-display-sm sm:text-display-md font-semibold text-on-surface">
              DevOps, Linux a cloudová infrastruktura
            </h1>
            <p className="mt-4 text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Pomáhám českým firmám provozovat weby a aplikace spolehlivě,
              bezpečně a bez zbytečných nákladů na cloud.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-6 text-body-lg text-on-surface-variant leading-relaxed">
          <div className="relative p-6 rounded-md border border-primary/70 bg-primary/10">
            <p className="text-title-lg text-on-surface leading-snug">
              <strong>
                Navrhuji a spravuji infrastrukturu, která odpovídá skutečným
                potřebám projektu.
              </strong>{" "}
              <span className="text-on-surface-variant">
                Od jednoho správně nastaveného VPS přes monitoring a zálohy až
                po automatizovaný cloudový provoz. Technologie vybírám podle
                zátěže, rizika a rozpočtu, ne podle loga poskytovatele.
              </span>
            </p>
          </div>

          <h2 className="pt-2 text-headline-sm font-semibold text-on-surface">
            DevOps a hosting pro malé a střední firmy
          </h2>
          <p>
            Jsem <strong className="text-on-surface">Martin Baránek</strong> —
            DevOps inženýr a Linux administrátor. Firmám pomáhám s návrhem
            hostingu, migracemi serverů, automatizací nasazení, monitoringem,
            zálohováním a optimalizací nákladů na AWS nebo VPS. Širší přehled
            mojí práce najdete na{" "}
            <a
              href="https://baranekm.cz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface underline decoration-primary decoration-2 underline-offset-2"
            >
              baranekm.cz
            </a>
            .
          </p>

          <p>
            Nejčastěji řeším WordPress a e-shopy, interní aplikace, API s
            databází a firemní systémy, které přerostly původní hosting. Cílem
            není postavit co nejsložitější architekturu, ale provoz, kterému
            firma rozumí a který dokáže dlouhodobě financovat.
          </p>

          <h2 className="pt-2 text-headline-sm font-semibold text-on-surface">
            Proč vznikla KalkulackaHostingu.cz
          </h2>
          <p>
            Při konzultacích se opakovala stejná situace: firma znala cenu
            virtuálního serveru, ale v rozpočtu chyběl přenos dat, databáze,
            snapshoty, monitoring nebo správa. U AWS se z několika malých
            položek snadno stane faktura, která je výrazně vyšší než původní
            odhad.
          </p>
          <p>
            Kalkulačka proto porovnává AWS, Hetzner, MasterDC a Forpsi na
            stejném zadání. Neříká, že jeden poskytovatel je nejlepší pro
            všechny. Ukazuje, kdy se vyplatí jednoduchý VPS, kdy české
            datacentrum a kdy pokročilé služby AWS skutečně obhájí svou cenu.
          </p>

          <h2 className="pt-2 text-headline-sm font-semibold text-on-surface">
            S čím vám mohu pomoci
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>výběr hostingu a návrh infrastruktury pro nový projekt,</li>
            <li>kontrola a snížení nákladů na AWS nebo stávající servery,</li>
            <li>migrace webu, databáze nebo aplikace bez zbytečného výpadku,</li>
            <li>Linux, Docker, CI/CD, monitoring, zálohy a provozní automatizace.</li>
          </ul>

          <Card variant="filled" className="mt-6 p-4 border border-outline-variant flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="https://baranekm.cz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-label-lg text-on-surface underline decoration-primary decoration-2 underline-offset-2 inline-flex items-center gap-1"
            >
              baranekm.cz <span aria-hidden>↗</span>
            </a>
            <a
              href="mailto:martin.baranek@outlook.com"
              className="text-label-lg text-on-surface underline decoration-primary decoration-2 underline-offset-2"
            >
              martin.baranek@outlook.com
            </a>
            <span className="text-label-md text-on-surface-variant">
              Konzultace hostingu, AWS a Linux infrastruktury
            </span>
          </Card>
        </section>

        {/* Under the hood */}
        <section className="mt-4">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
            <div className="rounded-xl border border-outline-variant/60 bg-surface/78 shadow-elev-2 backdrop-blur-xl p-5 sm:p-8">
            <div className="flex items-baseline justify-between gap-4 mb-2 flex-wrap">
              <div>
                <div className="text-label-md text-primary">
                  Pod kapotou
                </div>
                <h2 className="mt-2 text-headline-md font-semibold text-on-surface">
                  Jak funguje kalkulačka hostingu
                </h2>
              </div>
              <Chip tone="primary">{APP_VERSION_LABEL}</Chip>
            </div>
            <p className="text-body-lg text-on-surface-variant mt-4">
              Projekt je open source. Zdrojový kód, ceníky poskytovatelů i
              výpočet ceny jsou veřejné, takže si můžete ověřit předpoklady,
              zdroje dat a způsob výběru odpovídajícího serveru.
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
            <Card variant="filled" className="p-0 overflow-hidden border border-on-surface">
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
                className="text-on-surface underline decoration-primary decoration-2 underline-offset-2"
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
                className="inline-flex items-center gap-2 rounded-sm px-5 py-2.5 bg-on-surface text-background text-label-lg font-semibold border border-on-surface hover:bg-primary hover:border-primary hover:text-on-primary transition-colors md-state-layer"
              >
                <span aria-hidden>⌥</span> Kód na GitHubu
                <span aria-hidden>↗</span>
              </a>
              <Link
                href="/#kalkulacka"
                className="text-label-lg text-on-surface underline decoration-primary decoration-2 underline-offset-2"
              >
                ← Zpět na kalkulačku
              </Link>
            </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
