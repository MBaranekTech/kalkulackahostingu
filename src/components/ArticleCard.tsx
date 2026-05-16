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
        variant="elevated"
        elevation={1}
        className="p-5 sm:p-6 h-full transition-all duration-200 group-hover:shadow-elev-3 group-focus-visible:shadow-elev-3"
      >
        <div className="flex flex-wrap gap-1.5 mb-3">
          {article.tags.map((t) => (
            <Chip key={t} tone="primary">
              {t}
            </Chip>
          ))}
        </div>
        <h3 className="text-title-lg text-on-surface group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        <p className="mt-2 text-body-md text-on-surface-variant line-clamp-3">
          {article.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between text-label-md text-on-surface-variant">
          <span className="font-mono">
            {article.date} · {article.readingMinutes} min
          </span>
          <span className="text-primary group-hover:translate-x-1 transition-transform">
            Číst →
          </span>
        </div>
      </Card>
    </Link>
  );
}
