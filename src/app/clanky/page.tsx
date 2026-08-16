import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { articles, getArticlePath } from "@/lib/articles";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";

const description =
  "Praktické články o cenách hostingu, AWS, Hetzneru a českých datacentrech. Srovnání nákladů, skrytých poplatků, latence, GDPR a podpory.";

export const metadata: Metadata = {
  title: "Články o hostingu, AWS a cloudových nákladech",
  description,
  alternates: { canonical: "/clanky/" },
  openGraph: {
    title: "Články o hostingu, AWS a cloudových nákladech",
    description,
    url: absoluteUrl("/clanky/"),
    type: "website",
  },
};

const articlesJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${absoluteUrl("/clanky/")}#collection`,
  url: absoluteUrl("/clanky/"),
  name: "Články o hostingu, AWS a cloudových nákladech",
  description,
  inLanguage: "cs-CZ",
  isPartOf: {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: articles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: article.title,
      url: absoluteUrl(getArticlePath(article)),
    })),
  },
};

export default function ClankyPage() {
  return (
    <>
      <JsonLd data={articlesJsonLd} />
      <Header />
      <main className="flex-1">
        <section className="px-4 sm:px-6 pt-8 sm:pt-12">
          <div className="max-w-5xl mx-auto rounded-xl border border-outline-variant/60 bg-surface/78 shadow-elev-2 backdrop-blur-xl px-5 sm:px-10 py-10 sm:py-14 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="text-label-md text-primary">
                Průvodce hostingem bez marketingu
              </div>
              <h1 className="mt-4 text-display-sm sm:text-display-md font-semibold text-on-surface">
                Články o cenách hostingu a AWS
              </h1>
              <p className="mt-4 text-body-lg text-on-surface-variant max-w-2xl">
                Praktická srovnání pro české firmy: kolik stojí AWS v reálném
                provozu, kdy zvolit Hetzner nebo české datacentrum a které
                poplatky se v první kalkulaci snadno ztratí.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
          <div className="mt-8 rounded-lg border border-outline-variant/60 bg-surface/75 backdrop-blur-xl p-5 sm:p-8">
            <h2 className="text-headline-sm font-semibold text-on-surface">
              Jak vybrat hosting podle potřeb projektu
            </h2>
            <div className="mt-4 grid md:grid-cols-3 gap-5 text-body-md text-on-surface-variant leading-relaxed">
              <p>
                <strong className="text-on-surface">Cena AWS</strong> není jen
                cena EC2 instance. Do rozpočtu patří databáze, disk, odchozí
                data, monitoring a síťové služby. Začněte přehledem{" "}
                <Link
                  href="/clanky/pet-skrytych-nakladu-aws/"
                  className="text-on-surface underline decoration-primary underline-offset-2"
                >
                  skrytých nákladů AWS
                </Link>
                .
              </p>
              <p>
                <strong className="text-on-surface">Český hosting</strong> dává
                smysl tam, kde rozhoduje umístění dat, česká smlouva nebo
                telefonická podpora. Podívejte se na srovnání{" "}
                <Link
                  href="/clanky/proc-mit-data-v-cr/"
                  className="text-on-surface underline decoration-primary underline-offset-2"
                >
                  MasterDC a AWS Frankfurt
                </Link>
                .
              </p>
              <p>
                <strong className="text-on-surface">VPS a Hetzner</strong> bývá
                pro WordPress, e-shop nebo menší API cenově jednodušší. Pro
                konkrétní návštěvnost a objem dat použijte{" "}
                <Link
                  href="/#kalkulacka"
                  className="text-on-surface underline decoration-primary underline-offset-2"
                >
                  kalkulačku ceny hostingu
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
