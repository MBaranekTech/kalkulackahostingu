import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Články",
  description:
    "Názory, čísla a praktické příklady o cenách hostingu, AWS a českých alternativách.",
};

export default function ClankyPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="border-b border-outline-variant">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="max-w-3xl">
              <div className="text-label-lg uppercase tracking-wider text-on-surface-variant">
                Články
              </div>
              <h1 className="mt-2 text-display-sm sm:text-display-md font-semibold tracking-tight text-on-surface">
                Názory, čísla a překvapení z účtenek
              </h1>
              <p className="mt-4 text-body-lg text-on-surface-variant max-w-2xl">
                Reálná čísla z reálných projektů. Čí ceny jsou férové, kde se
                schovávají náklady a kdy AWS dává smysl — a kdy je to drahá
                hloupost.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
