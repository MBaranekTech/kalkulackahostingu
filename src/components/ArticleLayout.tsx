import Link from "next/link";
import type { ReactNode } from "react";
import { getArticlePath, type ArticleMeta } from "@/lib/articles";
import {
  AUTHOR_NAME,
  AUTHOR_URL,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/seo";
import { JsonLd } from "./JsonLd";
import { Chip } from "./ui/Chip";

interface Props {
  meta: ArticleMeta;
  children: ReactNode;
}

export function ArticleLayout({ meta, children }: Props) {
  const articleUrl = absoluteUrl(getArticlePath(meta));
  const formattedDate = new Intl.DateTimeFormat("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${meta.date}T00:00:00Z`));
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${articleUrl}#article`,
        headline: meta.title,
        description: meta.excerpt,
        url: articleUrl,
        mainEntityOfPage: articleUrl,
        datePublished: meta.date,
        dateModified: meta.date,
        image: absoluteUrl("/opengraph-image"),
        inLanguage: "cs-CZ",
        timeRequired: `PT${meta.readingMinutes}M`,
        articleSection: meta.tags[0],
        keywords: meta.tags.join(", "),
        author: {
          "@type": "Person",
          name: AUTHOR_NAME,
          url: AUTHOR_URL,
        },
        publisher: {
          "@type": "Person",
          name: AUTHOR_NAME,
          url: AUTHOR_URL,
        },
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: SITE_NAME,
          url: SITE_URL,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Kalkulačka hostingu",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Články o hostingu",
            item: absoluteUrl("/clanky/"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: meta.title,
            item: articleUrl,
          },
        ],
      },
    ],
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <JsonLd data={articleJsonLd} />
      <div className="rounded-xl border border-outline-variant/60 bg-surface/78 shadow-elev-2 backdrop-blur-xl p-5 sm:p-8 lg:p-10">
      <Link
        href="/clanky"
        className="text-label-md text-primary hover:text-on-surface inline-flex items-center gap-1 transition-colors"
      >
        <span aria-hidden>←</span> Zpět na články
      </Link>

      <header className="mt-7 mb-9 space-y-4 border-b border-outline-variant/60 pb-8">
        <div className="flex flex-wrap gap-1.5">
          {meta.tags.map((t) => (
            <Chip key={t} tone="primary">
              {t}
            </Chip>
          ))}
        </div>
        <h1 className="text-display-sm sm:text-display-md font-semibold text-on-surface">
          {meta.title}
        </h1>
        <p className="text-body-lg text-on-surface-variant">{meta.excerpt}</p>
        <div className="text-label-md text-on-surface-variant font-mono">
          <time dateTime={meta.date}>{formattedDate}</time> · {meta.readingMinutes} min čtení · {AUTHOR_NAME}
        </div>
      </header>

      <div className="article-body max-w-3xl space-y-5 text-body-lg text-on-surface leading-relaxed">
        {children}
      </div>

      <footer className="mt-12 pt-6 border-t border-outline-variant">
        <p className="text-body-md text-on-surface-variant">
          Chcete spočítat náklady pro vlastní projekt?{" "}
          <Link href="/#kalkulacka" className="text-on-surface underline decoration-primary decoration-2 underline-offset-2">
            Vyzkoušejte kalkulačku →
          </Link>
        </p>
        <p className="mt-2 text-body-md text-on-surface-variant">
          Řešíte výběr poskytovatele nebo migraci?{" "}
          <Link href="/kontakt/" className="text-on-surface underline decoration-primary decoration-2 underline-offset-2">
            Domluvte si konzultaci hostingu →
          </Link>
        </p>
      </footer>
      </div>
    </article>
  );
}
