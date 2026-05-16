import Link from "next/link";
import type { ReactNode } from "react";
import type { ArticleMeta } from "@/lib/articles";
import { Chip } from "./ui/Chip";

interface Props {
  meta: ArticleMeta;
  children: ReactNode;
}

export function ArticleLayout({ meta, children }: Props) {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Link
        href="/clanky"
        className="text-label-lg text-primary hover:underline inline-flex items-center gap-1"
      >
        <span aria-hidden>←</span> Zpět na články
      </Link>

      <header className="mt-6 mb-8 space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {meta.tags.map((t) => (
            <Chip key={t} tone="primary">
              {t}
            </Chip>
          ))}
        </div>
        <h1 className="text-display-sm sm:text-display-md font-semibold tracking-tight text-on-surface">
          {meta.title}
        </h1>
        <p className="text-body-lg text-on-surface-variant">{meta.excerpt}</p>
        <div className="text-label-md text-on-surface-variant font-mono">
          {meta.date} · {meta.readingMinutes} min čtení
        </div>
      </header>

      <div className="article-body space-y-5 text-body-lg text-on-surface leading-relaxed">
        {children}
      </div>

      <footer className="mt-12 pt-6 border-t border-outline-variant">
        <p className="text-body-md text-on-surface-variant">
          Chcete spočítat náklady pro vlastní projekt?{" "}
          <Link href="/#kalkulacka" className="text-primary hover:underline">
            Vyzkoušejte kalkulačku →
          </Link>
        </p>
      </footer>
    </article>
  );
}
