import type { Metadata } from "next";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getArticle } from "@/lib/articles";

const meta = getArticle("proc-mit-data-v-cr")!;

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
            Frankfurt je 500 km od Prahy. Z technického hlediska to je
            evropský region AWS, který nejlépe pasuje na český provoz. Z
            obchodního a právního hlediska je to ale stále zahraničí — a u
            některých klientů to rozhoduje.
          </p>

          <h2 className="text-headline-sm text-on-surface mt-8 mb-3">
            Latence — 25 ms vs 4 ms
          </h2>

          <p>
            Round-trip Praha → Frankfurt → Praha je typicky 20 — 30 ms.
            Praha → Praha přes MasterDC: 3 — 6 ms. Pro typický web s pár
            requesty per page load je rozdíl neviditelný. Pro real-time
            aplikace (chat, hry, finanční obchodování) je to fundamentální.
          </p>

          <h2 className="text-headline-sm text-on-surface mt-8 mb-3">
            Compliance — GDPR, ISO 27001, právo
          </h2>

          <p>
            GDPR řeší obojí. Ale specifické kontrakty (státní zakázky,
            zdravotnictví, finanční sektor) často explicitně vyžadují, aby
            data zůstávala <em>na území ČR</em>. MasterDC má datacentra v
            Praze a Brně, ISO 27001 certifikaci a kontrakt v českém právu.
            U AWS dostanete „eu-central-1“, ale smlouva je s Amazon Web
            Services Ireland Limited a vztahuje se na ní irské právo.
          </p>

          <p>
            U menšího e-shopu obvykle nejde o relevantní téma. U
            dodavatelského kontraktu pro zdravotnické zařízení nebo státní
            sektor však může být lokalita dat rozhodujícím faktorem.
          </p>

          <h2 className="text-headline-sm text-on-surface mt-8 mb-3">
            Podpora — v češtině, na telefon, v provozní době
          </h2>

          <p>
            Základní podpora AWS funguje pouze přes formulář s reakční dobou
            12—24 h. Pro česky mluvícího inženýra na telefonu je nutný
            Business Support — minimálně 100 USD/měsíc.
          </p>

          <p>
            MasterDC nabízí podporu v češtině, telefonicky a v režimu 24/7 v
            ceně služby. Forpsi podobně. Hetzner komunikuje v angličtině
            převážně e-mailem, ale s krátkou reakční dobou. Pro klienta
            řešícího výpadek ve 23:00 v neděli je tento rozdíl podstatný.
          </p>

          <h2 className="text-headline-sm text-on-surface mt-8 mb-3">
            Kdy je EU region OK
          </h2>

          <ul className="list-disc pl-6 space-y-1.5">
            <li>
              B2C web/e-shop bez specifických compliance požadavků.
            </li>
            <li>SaaS s evropskou klientelou napříč zeměmi.</li>
            <li>
              Projekt, kde použijete AWS managed služby, které v ČR
              ekvivalent nemají (Lambda, Aurora Serverless, SageMaker).
            </li>
          </ul>

          <h2 className="text-headline-sm text-on-surface mt-8 mb-3">
            Kdy zvolit české DC
          </h2>

          <ul className="list-disc pl-6 space-y-1.5">
            <li>
              Smlouva nebo audit explicitně vyžaduje data na území ČR.
            </li>
            <li>
              Citlivé osobní údaje (zdravotnictví, finanční sektor) a
              zákazník v ČR.
            </li>
            <li>
              Real-time aplikace, kde 20 ms latence reálně ovlivňuje
              uživatelský zážitek.
            </li>
            <li>
              Klient, který chce mluvit česky a chce mít kontrakt v
              češtině.
            </li>
          </ul>

          <p>
            Volba nemusí být binární. U některých projektů dává smysl hybrid
            — primární data v ČR, disaster recovery v EU regionu. To už je
            ale otázka architektury, nikoli ceníku.
          </p>
        </ArticleLayout>
      </main>
      <Footer />
    </>
  );
}
