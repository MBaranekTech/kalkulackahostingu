import Link from "next/link";
import { articles } from "@/lib/articles";
import { ArticleCard } from "./ArticleCard";

export function ArticlesTeaser() {
  const featured = articles.slice(0, 3);
  return (
    <section
      id="clanky"
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-14"
    >
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <div className="text-label-lg uppercase tracking-wider text-on-surface-variant">
            Články
          </div>
          <h2 className="mt-2 text-headline-md text-on-surface tracking-tight">
            Názory, čísla a překvapení z účtenek
          </h2>
        </div>
        <Link
          href="/clanky"
          className="text-label-lg text-primary hover:underline shrink-0 pb-1"
        >
          Všechny →
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {featured.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </section>
  );
}
