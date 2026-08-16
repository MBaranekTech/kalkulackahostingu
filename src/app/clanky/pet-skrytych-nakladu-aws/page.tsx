import Link from "next/link";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { createArticleMetadata, getArticle } from "@/lib/articles";

const meta = getArticle("pet-skrytych-nakladu-aws")!;

export const metadata = createArticleMetadata(meta);

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ArticleLayout meta={meta}>
          <p>
            AWS ceník působí transparentně. Otevřete kalkulačku, vyberete
            EC2 instanci, vidíte cenu. Realita je, že měsíční faktura
            obvykle obsahuje 5—10 položek, které v původním výpočtu chyběly.
            Níže pět z nich, na které klienti nejčastěji zapomenou.
          </p>

          <h2 className="text-headline-sm text-on-surface mt-8 mb-3">
            1. NAT Gateway — 750 Kč/měsíc sám o sobě
          </h2>

          <p>
            Pokud používáte privátní subnety (a měli byste, pokud máte něco
            víc než hello-world API), potřebujete NAT Gateway, aby vaše
            servery měly přístup k internetu. NAT Gateway stojí ~32 USD
            měsíčně <em>jen za to, že existuje</em>, plus 0,045 USD za každý
            GB provozu.
          </p>

          <p>
            U malého API to dělá <strong>800 — 1 200 Kč navíc měsíčně</strong>.
            U Hetzneru, MasterDC i Forpsi je tahle funkcionalita součástí
            ceny serveru.
          </p>

          <h2 className="text-headline-sm text-on-surface mt-8 mb-3">
            2. EBS snapshoty — pomalý, ale neústupný nárůst
          </h2>

          <p>
            Snapshoty disku jsou nutnost. Účtují se za GB uloženého obsahu —
            ~1,20 Kč/GB/měsíc. Vypadá to neškodně, dokud nezačnete dělat
            denní snapshoty 100 GB disku a po půl roce nemáte 100 GB, ale 18
            TB snapshot dat na faktuře.
          </p>

          <p>
            Lifecycle policy ano, retence ano. Ale skoro nikdo to neřeší,
            dokud nepřijde faktura.
          </p>

          <h2 className="text-headline-sm text-on-surface mt-8 mb-3">
            3. Data Transfer Out — nenápadná, ale výrazná položka
          </h2>

          <p>
            AWS poskytuje prvních 100 GB egressu zdarma, dále 2,15 Kč/GB.
            Pro statický web zanedbatelné, pro e-shop s obrázky produktů a
            300 GB měsíčního provozu však 430 Kč navíc.
          </p>

          <p>
            Pro srovnání: Hetzner zahrnuje 20 TB egressu zdarma — tedy zhruba
            dvousetnásobek volné kvóty AWS.
          </p>

          <h2 className="text-headline-sm text-on-surface mt-8 mb-3">
            4. Cross-region a Cross-AZ Data Transfer
          </h2>

          <p>
            Máte multi-AZ databázi pro vysokou dostupnost? Replikace stojí
            ~0,01 USD/GB. Voláte do služby v jiném regionu? Další poplatek.
            CloudFront → origin v jiném regionu? Třetí poplatek.
          </p>

          <p>
            Jednotlivě jde o drobné částky, v součtu však tyto položky
            typicky tvoří 5—15 % celkové faktury. Většina klientů na ně
            přijde teprve při prvním rozboru v Cost Exploreru.
          </p>

          <h2 className="text-headline-sm text-on-surface mt-8 mb-3">
            5. CloudWatch — logy, metriky, alarmy
          </h2>

          <p>
            CloudWatch Logs: 0,50 USD za GB ingestovaných logů + 0,03 USD za
            GB skladování. Defaultní log retention je „forever“ — pokud to
            nezměníte, platíte dál.
          </p>

          <p>
            CloudWatch Metrics nad free tier (10 custom metrik): 0,30 USD za
            metriku/měsíc. CloudWatch Alarms: 0,10 USD za alarm/měsíc.
          </p>

          <p>
            Pro středně velkou aplikaci s 50 custom metrikami a 20 alarmy se
            dostanete na ~500 — 800 Kč/měsíc <em>jen za monitoring</em>.
          </p>

          <h2 className="text-headline-sm text-on-surface mt-8 mb-3">
            Souhrn
          </h2>

          <p>
            Pro typický středně velký WordPress e-shop vychází základní
            AWS sestava přibližně na 1 500 Kč měsíčně. Po započtení pěti
            výše uvedených položek se reálná částka přibližuje 3 200 Kč —
            tedy zhruba dvojnásobek toho, co klient vidí v AWS kalkulačce
            při prvním odhadu.
          </p>

          <p>
            Tato kalkulačka byla postavena s cílem zviditelnit i tyto
            položky{" "}
            <Link href="/#kalkulacka" className="text-on-surface underline decoration-primary decoration-2 underline-offset-2">
              ještě před rozhodnutím
            </Link>
            , nikoli až při první faktuře.
          </p>
        </ArticleLayout>
      </main>
      <Footer />
    </>
  );
}
