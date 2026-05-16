import { ArticlesTeaser } from "@/components/ArticlesTeaser";
import { CalculatorApp } from "@/components/CalculatorApp";
import { ContactCTA } from "@/components/ContactCTA";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-outline-variant">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-container text-on-primary-container px-3 py-1 text-label-md">
                <span aria-hidden>✨</span>
                <span>Nová verze — květen 2026</span>
              </div>
              <h1 className="mt-4 text-display-sm sm:text-display-md font-semibold text-on-surface tracking-tight">
                Možná{" "}
                <span className="text-primary">nepotřebujete AWS.</span>
              </h1>
              <p className="mt-4 text-body-lg text-on-surface-variant max-w-2xl">
                Spočítejte si měsíční náklady na hosting napříč AWS, Hetzner,
                MasterDC a Wedos pro typické scénáře malých českých firem.
                Včetně skrytých nákladů, na které ceník nemyslí.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <CalculatorApp />
        </section>

        {/* Articles teaser */}
        <ArticlesTeaser />

        {/* CTA */}
        <section
          id="kontakt"
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-14"
        >
          <ContactCTA />
        </section>

        {/* Methodology */}
        <section
          id="metodologie"
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-14"
        >
          <h2 className="text-headline-sm text-on-surface">
            Jak kalkulačka počítá
          </h2>
          <div className="mt-4 grid sm:grid-cols-2 gap-4 text-body-md text-on-surface-variant">
            <p>
              <strong className="text-on-surface">Compute</strong> se odhaduje
              z měsíční návštěvnosti — 1 vCPU pro &lt;10k návštěv, až 16 vCPU
              pro 1M+. RAM se škáluje obdobně a přidává se 2 GB navíc, pokud
              projekt potřebuje databázi.
            </p>
            <p>
              <strong className="text-on-surface">Transfer</strong> se počítá
              jako egress nad bezplatnou kvótu poskytovatele. Hetzner má 20 TB
              zdarma, AWS jen 100 GB.
            </p>
            <p>
              <strong className="text-on-surface">CDN</strong> u AWS znamená
              CloudFront — předpokládáme, že 50 % egressu jde přes CDN.
              Hetzner a české hostingy nemají vlastní CDN, lze použít
              Cloudflare zdarma.
            </p>
            <p>
              <strong className="text-on-surface">Skryté náklady</strong>{" "}
              (NAT Gateway, EBS snapshots) nejsou v hlavní ceně, ale na
              reálné faktuře dohromady přidají stovky až tisíce Kč. Vždy
              čtěte sekci „Skryté náklady“ u poskytovatele.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
