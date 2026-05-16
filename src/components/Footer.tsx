import { lastUpdated } from "@/lib/providers";
import { APP_VERSION_LABEL } from "@/lib/version";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-outline-variant bg-surface-low">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid sm:grid-cols-3 gap-8">
        <div>
          <div className="text-title-md text-on-surface">
            KalkulackaHostingu<span className="text-primary">.cz</span>
          </div>
          <p className="text-body-md text-on-surface-variant mt-2 max-w-xs">
            Open-source kalkulačka pro porovnání cen hostingu napříč AWS,
            Hetzner, MasterDC a Wedos.
          </p>
        </div>
        <div>
          <div className="text-label-lg text-on-surface-variant uppercase tracking-wider">
            Projekt
          </div>
          <ul className="mt-2 space-y-1 text-body-md">
            <li>
              <a href="#metodologie" className="hover:text-primary">
                Metodologie výpočtu
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-primary">
                Časté dotazy
              </a>
            </li>
            <li>
              <a href="#kontakt" className="hover:text-primary">
                Kontakt
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-label-lg text-on-surface-variant uppercase tracking-wider">
            Data
          </div>
          <p className="text-body-md text-on-surface-variant mt-2">
            Ceny aktualizovány:{" "}
            <span className="text-on-surface font-mono">{lastUpdated}</span>
          </p>
          <p className="text-label-md text-on-surface-variant mt-2">
            Orientační kalkulace, ne závazná nabídka.
          </p>
        </div>
      </div>
      <div className="border-t border-outline-variant">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-label-md text-on-surface-variant flex flex-wrap items-center justify-between gap-2">
          <span>
            © {new Date().getFullYear()} Martin Baránek · Postaveno
            s Next.js a Cloudflare Pages.
          </span>
          <span className="font-mono">{APP_VERSION_LABEL}</span>
        </div>
      </div>
    </footer>
  );
}
