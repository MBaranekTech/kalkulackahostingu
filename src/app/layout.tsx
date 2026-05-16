import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const SITE_URL = "https://kalkulackahostingu.cz";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Kalkulačka hostingu — AWS vs český hosting | KalkulackaHostingu.cz",
    template: "%s | KalkulackaHostingu.cz",
  },
  description:
    "Spočítejte si, kolik vás bude reálně stát hosting. Porovnání AWS, Hetzner, MasterDC a Forpsi pro typické scénáře malých firem. Včetně skrytých nákladů.",
  keywords: [
    "kalkulačka hosting",
    "kalkulačka aws",
    "porovnání hosting",
    "aws cena",
    "hetzner cena",
    "český hosting",
    "wordpress hosting",
  ],
  authors: [{ name: "Martin Baránek" }],
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: SITE_URL,
    siteName: "KalkulackaHostingu.cz",
    title:
      "Kolik vás bude stát hosting? Porovnejte AWS a české alternativy",
    description:
      "Spočítejte si měsíční náklady na hosting napříč AWS, Hetzner, MasterDC a Forpsi — včetně skrytých nákladů.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalkulačka hostingu — AWS vs český hosting",
    description:
      "Porovnání cen hostingu pro malé firmy. Včetně skrytých nákladů.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

// Inline script — runs before <body> renders so the theme is applied before
// first paint. Reads localStorage; falls back to OS preference.
const themeInitScript = `(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="cs"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-background">
        {children}
      </body>
    </html>
  );
}
