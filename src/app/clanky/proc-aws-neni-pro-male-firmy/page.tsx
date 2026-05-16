import type { Metadata } from "next";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getArticle } from "@/lib/articles";

const meta = getArticle("proc-aws-neni-pro-male-firmy")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.excerpt,
  openGraph: { title: meta.title, description: meta.excerpt, type: "article" },
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ArticleLayout meta={meta}>
          <p>
            AWS je výjimečně schopná platforma. Postavili ji lidé, kteří
            potřebovali obsluhovat globální e-commerce s autoscalingem v
            desítkách regionů. Z dokumentace je hned čitelné, k čemu byla
            navržena — k masivně paralelním, geograficky distribuovaným a
            vysoce dostupným systémům.
          </p>

          <p>
            Velká část českých malých firem však ani jeden z těchto
            požadavků nemá. V praxi potřebují jeden server, jednu databázi
            a spolehlivý provoz. AWS tyto základní potřeby řeší — ale za
            cenu, která neodpovídá hodnotě reálně využitých služeb.
          </p>

          <h2 className="text-headline-sm text-on-surface mt-8 mb-3">
            Co vás AWS stojí, než vůbec začnete
          </h2>

          <p>
            Spustíte EC2 t3.small (2 vCPU, 2 GB RAM) v eu-central-1 a začnete
            platit zhruba <strong>350 Kč/měsíc</strong>. To samo o sobě není
            špatné. Problém začíná u věcí, které potřebujete, aby se to dalo
            vůbec použít:
          </p>

          <ul className="list-disc pl-6 space-y-1.5">
            <li>
              <strong>NAT Gateway</strong> — pokud chcete privátní subnet
              (běžně doporučovaný přístup), platíte 750 Kč/měsíc + 1 Kč za
              každý GB provozu. Samotná tato služba stojí dvojnásobek
              základního serveru.
            </li>
            <li>
              <strong>EBS</strong> — disk se účtuje zvlášť (~2,15 Kč/GB), a
              navíc EBS snapshoty (~1,20 Kč/GB) které se kumulují.
            </li>
            <li>
              <strong>RDS</strong> — managed MySQL/Postgres začíná na ~300
              Kč/měsíc za instanci, plus per-GB storage.
            </li>
            <li>
              <strong>Data Transfer Out</strong> — 100 GB zdarma, pak 2,15
              Kč/GB. Streaming, obrázky e-shopu, API odpovědi.
            </li>
            <li>
              <strong>CloudWatch</strong> — bez logů a metrik se AWS
              prakticky neprovozuje; jednotlivé položky v ceníku jsou drobné,
              ale v součtu typicky tvoří 5—10 % celkové faktury.
            </li>
          </ul>

          <p>
            Sečtěte si to: i pro malý WordPress e-shop končíte na 2 500 — 3
            500 Kč měsíčně. Hetzner stejný workload obslouží za 600 — 900 Kč.
          </p>

          <h2 className="text-headline-sm text-on-surface mt-8 mb-3">
            Argument škálovatelnosti
          </h2>

          <p>
            Ano, škálovatelnost AWS je reálná konkurenční výhoda. V praxi ji
            ale začnete využívat až nad zhruba 100 000 návštěvníků měsíčně,
            případně při výrazně variabilní zátěži. Pro projekty pod touto
            hranicí jde o schopnost, za kterou platíte měsíčně, ale neuvedete
            ji v provoz.
          </p>

          <h2 className="text-headline-sm text-on-surface mt-8 mb-3">
            Kdy AWS naopak <em>dává</em> smysl
          </h2>

          <ul className="list-disc pl-6 space-y-1.5">
            <li>
              Skutečně globální produkt — uživatelé na 3+ kontinentech, kde
              latence rozhoduje.
            </li>
            <li>
              Hluboce serverless architektura, kde 90 % nákladů je Lambda +
              DynamoDB, ne EC2.
            </li>
            <li>
              Specifické managed služby (SageMaker, Aurora Serverless v2),
              jejichž ekvivalent jinde neexistuje.
            </li>
            <li>
              Enterprise klient explicitně vyžaduje AWS certifikace v
              kontraktu.
            </li>
          </ul>

          <p>
            Pokud do žádné z těchto kategorií nespadáte, AWS pro vás
            pravděpodobně není správnou volbou. Není to kritika platformy
            jako takové — spíše uznání toho, jak specifický nástroj AWS ve
            skutečnosti je.
          </p>
        </ArticleLayout>
      </main>
      <Footer />
    </>
  );
}
