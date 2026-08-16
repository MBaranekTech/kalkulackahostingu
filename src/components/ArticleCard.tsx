import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";
import { Card } from "./ui/Card";
import { Chip } from "./ui/Chip";

interface Props {
  article: ArticleMeta;
}

export function ArticleCard({ article }: Props) {
  return (
    <Link
      href={`/clanky/${article.slug}`}
      className="group block focus:outline-none"
    >
      <Card
        variant="filled"
        elevation={0}
        className="p-5 sm:p-6 min-h-64 h-full border border-outline-variant/60 bg-surface/75 backdrop-blur-xl transition-colors duration-150 group-hover:border-primary group-hover:bg-primary/10 group-focus-visible:border-primary"
      >
        <div className="flex flex-wrap gap-1.5 mb-3">
          {article.tags.map((t) => (
            <Chip key={t} tone="primary">
              {t}
            </Chip>
          ))}
        </div>
        <h3 className="text-title-lg font-semibold text-on-surface">
          {article.title}
        </h3>
        <p className="mt-2 text-body-md text-on-surface-variant line-clamp-3">
          {article.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between text-label-md text-on-surface-variant">
          <span className="font-mono">
            {article.date} · {article.readingMinutes} min
          </span>
          <span className="text-on-surface group-hover:translate-x-1 transition-transform">
            Číst →
          </span>
        </div>
      </Card>
    </Link>
  );
}
