import type { Metadata } from "next";
import {
  AUTHOR_NAME,
  AUTHOR_URL,
  SITE_NAME,
  absoluteUrl,
} from "./seo";

export interface ArticleMeta {
  slug: string;
  title: string;
  /** Short opinionated subtitle / SEO description (~140-160 chars). */
  excerpt: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  /** Reading time in minutes (rough). */
  readingMinutes: number;
  /** Tag chips shown on the card. */
  tags: string[];
}

// Newest first. Adding an article = append here + create the page file.
export const articles: ArticleMeta[] = [
  {
    slug: "proc-aws-neni-pro-male-firmy",
    title: "AWS pro malé firmy: kdy je zbytečně drahé",
    excerpt:
      "Kdy se AWS vyplatí malé firmě a kdy jen zvyšuje účet? Srovnání nákladů na EC2, RDS, přenos dat a provoz s Hetznerem a českým hostingem.",
    date: "2026-04-29",
    readingMinutes: 6,
    tags: ["AWS", "Názor"],
  },
  {
    slug: "proc-mit-data-v-cr",
    title: "Data v ČR: MasterDC vs AWS Frankfurt",
    excerpt:
      "Kdy musí firemní data zůstat v Česku? Porovnání MasterDC a AWS Frankfurt podle latence, GDPR, podpory, smluv a provozních nákladů.",
    date: "2026-03-18",
    readingMinutes: 5,
    tags: ["Compliance", "MasterDC"],
  },
  {
    slug: "pet-skrytych-nakladu-aws",
    title: "5 skrytých nákladů AWS, které zvyšují fakturu",
    excerpt:
      "NAT Gateway, EBS snapshoty, přenos dat, provoz mezi zónami a CloudWatch. Pět AWS poplatků, které často zdvojnásobí původní odhad.",
    date: "2026-02-11",
    readingMinutes: 7,
    tags: ["AWS", "Skryté náklady"],
  },
];

export function getArticle(slug: string): ArticleMeta | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlePath(article: ArticleMeta): string {
  return `/clanky/${article.slug}/`;
}

export function createArticleMetadata(article: ArticleMeta): Metadata {
  const path = getArticlePath(article);
  const url = absoluteUrl(path);

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: path },
    authors: [{ name: AUTHOR_NAME, url: AUTHOR_URL }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url,
      siteName: SITE_NAME,
      locale: "cs_CZ",
      publishedTime: article.date,
      modifiedTime: article.date,
      authors: [AUTHOR_URL],
      tags: article.tags,
    },
    twitter: {
      card: "summary",
      title: article.title,
      description: article.excerpt,
    },
  };
}
