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
    title: "Proč AWS není pro malé firmy",
    excerpt:
      "AWS je nástroj navržený pro globální, vysoce dynamické workloady. Pro typickou českou malou firmu to v praxi znamená platit za schopnosti, které nikdy nevyužije.",
    date: "2026-04-29",
    readingMinutes: 6,
    tags: ["AWS", "Názor"],
  },
  {
    slug: "proc-mit-data-v-cr",
    title: "Proč mít data v ČR — MasterDC vs AWS Frankfurt",
    excerpt:
      "Frankfurt je 500 km od Prahy. Compliance, latence, podpora v rodném jazyce a smlouva v českém právu — kdy se vyplatí české datacentrum.",
    date: "2026-03-18",
    readingMinutes: 5,
    tags: ["Compliance", "MasterDC"],
  },
  {
    slug: "pet-skrytych-nakladu-aws",
    title: "5 skrytých nákladů AWS, které jsem objevil",
    excerpt:
      "NAT Gateway za 750 Kč měsíčně. EBS snapshoty, na které se zapomíná. Data transfer mezi regiony. Pět položek, které AWS ceník na první pohled nezdůrazňuje.",
    date: "2026-02-11",
    readingMinutes: 7,
    tags: ["AWS", "Skryté náklady"],
  },
];

export function getArticle(slug: string): ArticleMeta | undefined {
  return articles.find((a) => a.slug === slug);
}
