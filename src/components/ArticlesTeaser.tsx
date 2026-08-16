import Link from "next/link";
import { articles } from "@/lib/articles";
import { ArticleCard } from "./ArticleCard";

export function ArticlesTeaser() {
  const featured = articles.slice(0, 3);
  return (
    <section
      id="clanky"
      className="max-w-5xl mx-auto px-4 sm:px-6 pb-12"
    >
      <div className="flex items-end justify-between gap-4 mb-5 px-1">
        <div>
          <div className="text-label-md text-primary">
            Zápisník
          </div>
          <h2 className="mt-1 text-headline-md font-semibold text-on-surface">
            Články o hostingu a cloudových nákladech
          </h2>
        </div>
        <Link
          href="/clanky"
          className="text-label-md text-on-surface hover:text-primary shrink-0 p-2 transition-colors"
        >
          Všechny články →
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featured.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </section>
  );
}
