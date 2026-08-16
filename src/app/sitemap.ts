import type { MetadataRoute } from "next";
import { articles, getArticlePath } from "@/lib/articles";
import { lastUpdated } from "@/lib/providers";
import { CONTENT_LAST_MODIFIED, absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: lastUpdated,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/clanky/"),
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/o-mne/"),
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/kontakt/"),
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: absoluteUrl(getArticlePath(article)),
    lastModified: article.date,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...pages, ...articlePages];
}