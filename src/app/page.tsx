import type { Metadata } from "next";
import Link from "next/link";
import { ArticlesTeaser } from "@/components/ArticlesTeaser";
import { CalculatorApp } from "@/components/CalculatorApp";
import { ContactCTA } from "@/components/ContactCTA";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { lastUpdated } from "@/lib/providers";
import {
  AUTHOR_NAME,
  AUTHOR_URL,
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Kalkulačka ceny hostingu | AWS, Hetzner a český hosting" },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Kalkulačka ceny hostingu: AWS vs Hetzner a český hosting",
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    type: "website",
  },
};

const faqs = [
  {
    question: "Kolik stojí hosting webu měsíčně?",
    answer:
      "Jednoduchý web nebo menší WordPress může stát stovky korun měsíčně. E-shop, API s databází nebo projekt s vyšším přenosem dat stojí více. Výsledná cena závisí hlavně na výkonu serveru, velikosti databáze, úložišti, odchozích datech a požadované správě.",
  },
  {
    question: "Je AWS dražší než Hetzner nebo český hosting?",
    answer:
      "U menších a stabilních projektů bývá AWS často dražší, protože zvlášť účtuje disk, databázi, síťové služby a část přenosu dat. AWS se vyplatí tam, kde projekt skutečně využije globální infrastrukturu, serverless služby nebo pružné škálování.",
  },
  {
    question: "Jaké skryté náklady hostingu kalkulačka zohledňuje?",
    answer:
      "Výpočet pracuje s cenou serveru, úložiště, přenosu dat, managed databáze a CDN. U výsledků navíc upozorňuje na položky jako AWS NAT Gateway, EBS snapshoty nebo monitoring, které nemusí být součástí základní ceny instance.",
  },
  {
    question: "Kdy zvolit hosting s daty v České republice?",
    answer:
      "České datacentrum je vhodné, když smlouva nebo audit vyžaduje data na území ČR, potřebujete nízkou latenci pro české uživatele, českou podporu nebo smluvní vztah podle českého práva.",
  },
];

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      inLanguage: "cs-CZ",
    },
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/#calculator`,
      url: SITE_URL,
      name: "Kalkulačka ceny hostingu",
      description: DEFAULT_DESCRIPTION,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      browserRequirements: "Vyžaduje moderní webový prohlížeč s JavaScriptem.",
      isAccessibleForFree: true,
      dateModified: lastUpdated,
      inLanguage: "cs-CZ",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "CZK",
      },
      author: {
        "@type": "Person",
        name: AUTHOR_NAME,
        url: AUTHOR_URL,
      },
      featureList: [
        "Porovnání cen AWS, Hetzner, MasterDC a Forpsi",
        "Výpočet měsíční ceny serveru, databáze a přenosu dat",
        "Upozornění na skryté náklady hostingu",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <Header />
      <main className="flex-1">
        <section className="px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
          <div className="max-w-5xl mx-auto overflow-hidden rounded-xl border border-outline-variant/60 bg-surface/78 shadow-elev-3 backdrop-blur-xl">
            <div className="px-5 sm:px-10 lg:px-14 pt-10 sm:pt-14 pb-8 sm:pb-10 text-center border-b border-outline-variant/60">
              <div className="text-label-md text-primary mb-4">
                AWS / Hetzner / MasterDC / Forpsi
              </div>
              <h1 className="text-display-sm sm:text-display-md font-semibold text-on-surface">
                Kalkulačka ceny hostingu
              </h1>
              <p className="mt-4 mx-auto max-w-2xl text-body-md sm:text-body-lg text-on-surface-variant">
                Porovnejte měsíční cenu hostingu u AWS, Hetzneru, MasterDC a
                Forpsi. Výpočet zahrnuje server, databázi, přenos dat, CDN i
                poplatky, které v základním ceníku snadno přehlédnete.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-label-md text-on-surface-variant">
                <span>✓ Bez registrace</span>
                <span>✓ Výsledek ihned</span>
                <span>✓ Ceny v CZK</span>
              </div>
            </div>
            <div className="px-5 sm:px-10 lg:px-14 py-10 sm:py-12">
              <CalculatorApp />
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
          <div className="rounded-lg border border-outline-variant/60 bg-surface/75 backdrop-blur-xl overflow-hidden">
            <div className="px-5 sm:px-7 py-5 border-b border-outline-variant/60">
              <h2 className="text-headline-sm font-semibold text-on-surface">
                AWS, Hetzner nebo český hosting?
              </h2>
              <p className="mt-2 text-body-md text-on-surface-variant max-w-3xl">
                Nejlevnější nabídka není automaticky nejlepší. Rozhoduje typ
                aplikace, objem dat, požadovaná dostupnost i to, kdo bude
                infrastrukturu spravovat.
              </p>
            </div>
            <div className="grid md:grid-cols-3 text-body-md text-on-surface-variant leading-relaxed">
              <section className="p-5 sm:p-7 border-b md:border-b-0 md:border-r border-outline-variant/60">
                <h3 className="text-title-md font-semibold text-on-surface">AWS</h3>
                <p className="mt-2">
                  Hodí se pro globální produkty, serverless architekturu a
                  projekty, které využijí pokročilé managed služby. U menšího
                  webu ale mohou síťové a provozní položky cenu výrazně zvýšit.
                </p>
                <Link href="/clanky/proc-aws-neni-pro-male-firmy/" className="mt-3 inline-block text-primary hover:text-on-surface">
                  Kdy se AWS vyplatí →
                </Link>
              </section>
              <section className="p-5 sm:p-7 border-b md:border-b-0 md:border-r border-outline-variant/60">
                <h3 className="text-title-md font-semibold text-on-surface">Hetzner</h3>
                <p className="mt-2">
                  Nabízí vysoký výkon VPS a velkou kvótu přenosu dat za
                  přehlednou cenu. Je dobrou volbou pro WordPress, e-shop nebo
                  API, pokud si zajistíte správu Linux serveru.
                </p>
              </section>
              <section className="p-5 sm:p-7">
                <h3 className="text-title-md font-semibold text-on-surface">MasterDC a Forpsi</h3>
                <p className="mt-2">
                  České řešení přináší lokální datacentrum, českou podporu a
                  jednodušší smluvní vztah. To může být důležitější než samotný
                  rozdíl v ceně serveru.
                </p>
                <Link href="/clanky/proc-mit-data-v-cr/" className="mt-3 inline-block text-primary hover:text-on-surface">
                  Kdy mít data v ČR →
                </Link>
              </section>
            </div>
          </div>
        </section>

        {/* Articles teaser */}
        <ArticlesTeaser />

        {/* CTA */}
        <section
          id="kontakt"
          className="max-w-5xl mx-auto px-4 sm:px-6 pb-12"
        >
          <ContactCTA />
        </section>

        {/* Methodology */}
        <section
          id="metodologie"
          className="max-w-5xl mx-auto px-4 sm:px-6 pb-16"
        >
          <div className="rounded-lg border border-outline-variant/60 bg-surface/75 backdrop-blur-xl overflow-hidden">
          <div className="px-5 sm:px-7 py-5 border-b border-outline-variant/60 flex items-baseline justify-between gap-4">
            <h2 className="text-title-lg font-semibold text-on-surface">Jak kalkulačka ceny hostingu počítá</h2>
            <span className="text-label-md text-on-surface-variant">Metodologie</span>
          </div>
          <div className="grid sm:grid-cols-2 text-body-md text-on-surface-variant">
            <p className="p-5 sm:p-7 border-b sm:border-r border-outline-variant/60">
              <strong className="text-on-surface">Compute</strong> se odhaduje
              z měsíční návštěvnosti — 1 vCPU pro &lt;10k návštěv, až 16 vCPU
              pro 1M+. RAM se škáluje obdobně a přidává se 2 GB navíc, pokud
              projekt potřebuje databázi.
            </p>
            <p className="p-5 sm:p-7 border-b border-outline-variant/60">
              <strong className="text-on-surface">Transfer</strong> se počítá
              jako egress nad bezplatnou kvótu poskytovatele. Hetzner má 20 TB
              zdarma, AWS jen 100 GB.
            </p>
            <p className="p-5 sm:p-7 border-b sm:border-b-0 sm:border-r border-outline-variant/60">
              <strong className="text-on-surface">CDN</strong> u AWS znamená
              CloudFront — předpokládáme, že 50 % egressu jde přes CDN.
              Hetzner a české hostingy nemají vlastní CDN, lze použít
              Cloudflare zdarma.
            </p>
            <p className="p-5 sm:p-7">
              <strong className="text-on-surface">Skryté náklady</strong>{" "}
              (NAT Gateway, EBS snapshots) nejsou v hlavní ceně, ale na
              reálné faktuře dohromady přidají stovky až tisíce Kč. Vždy
              čtěte sekci „Skryté náklady“ u poskytovatele.
            </p>
          </div>
          </div>
        </section>

        <section id="faq" className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <div className="rounded-lg border border-outline-variant/60 bg-surface/75 backdrop-blur-xl p-5 sm:p-7">
            <h2 className="text-headline-sm font-semibold text-on-surface">
              Časté otázky k ceně hostingu
            </h2>
            <div className="mt-5 divide-y divide-outline-variant/60">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-4">
                  <summary className="cursor-pointer list-none flex items-start justify-between gap-4 text-title-md font-semibold text-on-surface">
                    {faq.question}
                    <span aria-hidden className="text-primary group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 max-w-3xl text-body-md leading-relaxed text-on-surface-variant">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
