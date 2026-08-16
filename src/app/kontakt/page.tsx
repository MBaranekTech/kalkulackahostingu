import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import {
  AUTHOR_NAME,
  AUTHOR_URL,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/seo";

const description =
  "Konzultace výběru hostingu, AWS nákladů a Linux infrastruktury. Martin Baránek pomůže s návrhem, migrací i optimalizací provozu pro české firmy.";

export const metadata: Metadata = {
  title: "Konzultace hostingu, AWS a Linux infrastruktury",
  description,
  alternates: { canonical: "/kontakt/" },
  openGraph: {
    title: "Konzultace hostingu, AWS a Linux infrastruktury",
    description,
    url: absoluteUrl("/kontakt/"),
    type: "website",
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${absoluteUrl("/kontakt/")}#contact`,
      url: absoluteUrl("/kontakt/"),
      name: "Konzultace hostingu a cloudových nákladů",
      description,
      inLanguage: "cs-CZ",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
    {
      "@type": "Service",
      "@id": `${absoluteUrl("/kontakt/")}#service`,
      name: "Konzultace hostingu a cloudové infrastruktury",
      description,
      serviceType: [
        "Výběr hostingu",
        "Optimalizace nákladů AWS",
        "Návrh Linux infrastruktury",
        "Migrace webů a aplikací",
      ],
      areaServed: {
        "@type": "Country",
        name: "Česká republika",
      },
      provider: {
        "@type": "Person",
        "@id": `${AUTHOR_URL}/#person`,
        name: AUTHOR_NAME,
        url: AUTHOR_URL,
        email: "mailto:martin.baranek@outlook.com",
      },
    },
  ],
};

const services = [
  {
    title: "Výběr hostingu",
    text: "Porovnáme VPS, český hosting a cloud podle návštěvnosti, dat, dostupnosti, podpory a rozpočtu.",
  },
  {
    title: "Kontrola nákladů AWS",
    text: "Najdeme služby a poplatky, které zvyšují fakturu, a vyhodnotíme, zda dává smysl optimalizace nebo migrace.",
  },
  {
    title: "Migrace a nový provoz",
    text: "Navrhnu postup přesunu webu, databáze nebo aplikace včetně DNS, záloh, monitoringu a návratu při problému.",
  },
  {
    title: "Linux a automatizace",
    text: "Pomohu s Dockerem, CI/CD, aktualizacemi, monitoringem, zálohami a opakovatelným nasazením infrastruktury.",
  },
];

export default function KontaktPage() {
  return (
    <>
      <JsonLd data={contactJsonLd} />
      <Header />
      <main className="flex-1">
        <section className="px-4 sm:px-6 pt-8 sm:pt-12">
          <div className="max-w-4xl mx-auto rounded-xl border border-outline-variant/60 bg-surface/78 shadow-elev-2 backdrop-blur-xl px-5 sm:px-10 py-10 sm:py-14 text-center">
            <div className="text-label-md text-primary">
              Martin Baránek / DevOps konzultace
            </div>
            <h1 className="mt-4 text-display-sm sm:text-display-md font-semibold text-on-surface">
              Konzultace hostingu a cloudových nákladů
            </h1>
            <p className="mt-4 text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Řešíte nový hosting, vysokou fakturu za AWS nebo migraci
              aplikace? Projdeme technické požadavky, rizika i reálný měsíční
              rozpočet a vybereme řešení, které zvládnete dlouhodobě provozovat.
            </p>
            <a
              href="mailto:martin.baranek@outlook.com?subject=Konzultace%20hostingu%20a%20infrastruktury"
              className="mt-7 inline-flex items-center justify-center rounded-sm bg-on-surface text-background px-6 py-3 text-label-lg font-semibold hover:bg-primary hover:text-on-primary transition-colors"
            >
              Napsat na martin.baranek@outlook.com
            </a>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="rounded-lg border border-outline-variant/60 bg-surface/75 backdrop-blur-xl p-5 sm:p-8">
            <h2 className="text-headline-sm font-semibold text-on-surface">
              S čím vám pomohu
            </h2>
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              {services.map((service) => (
                <section
                  key={service.title}
                  className="rounded-md border border-outline-variant/60 bg-surface-lowest/20 p-5"
                >
                  <h3 className="text-title-md font-semibold text-on-surface">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-body-md leading-relaxed text-on-surface-variant">
                    {service.text}
                  </p>
                </section>
              ))}
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <section className="rounded-lg border border-outline-variant/60 bg-surface/75 backdrop-blur-xl p-5 sm:p-7">
              <h2 className="text-headline-sm font-semibold text-on-surface">
                Jak konzultace probíhá
              </h2>
              <ol className="mt-4 space-y-4 text-body-md text-on-surface-variant">
                <li><strong className="text-on-surface">1. Kontext:</strong> popíšete projekt, současný provoz a problém.</li>
                <li><strong className="text-on-surface">2. Varianty:</strong> porovnáme cenu, složitost, rizika a možnosti růstu.</li>
                <li><strong className="text-on-surface">3. Doporučení:</strong> dostanete konkrétní další krok a zdůvodnění.</li>
              </ol>
            </section>

            <section className="rounded-lg border border-outline-variant/60 bg-surface/75 backdrop-blur-xl p-5 sm:p-7">
              <h2 className="text-headline-sm font-semibold text-on-surface">
                Co poslat předem
              </h2>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-body-md text-on-surface-variant">
                <li>typ aplikace a přibližnou měsíční návštěvnost,</li>
                <li>velikost databáze, úložiště a přenosu dat,</li>
                <li>současného poskytovatele a měsíční cenu,</li>
                <li>požadavky na dostupnost, lokalitu dat a podporu.</li>
              </ul>
            </section>
          </div>

          <p className="mt-7 text-center text-body-md text-on-surface-variant">
            Pro rychlý první odhad můžete nejdřív použít{" "}
            <Link
              href="/#kalkulacka"
              className="text-on-surface underline decoration-primary underline-offset-2"
            >
              kalkulačku ceny hostingu
            </Link>
            .
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}