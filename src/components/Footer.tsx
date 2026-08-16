import { lastUpdated } from "@/lib/providers";
import { APP_VERSION_LABEL } from "@/lib/version";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-outline-variant/60 bg-surface/65 text-on-surface backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 grid sm:grid-cols-3 gap-8">
        <div>
          <div className="text-title-md font-semibold text-on-surface">
            KalkulackaHostingu.cz
          </div>
          <p className="text-body-md text-on-surface-variant mt-3 max-w-xs">
            Open-source kalkulačka pro porovnání cen hostingu napříč AWS,
            Hetzner, MasterDC a Forpsi.
          </p>
        </div>
        <div>
          <div className="text-label-md text-primary">
            Projekt
          </div>
          <ul className="mt-3 space-y-2 text-body-md text-on-surface">
            <li>
              <a href="/#metodologie" className="hover:text-primary">
                Metodologie výpočtu
              </a>
            </li>
            <li>
              <a href="/clanky" className="hover:text-primary">
                Články
              </a>
            </li>
            <li>
              <a href="/o-mne" className="hover:text-primary">
                O Martinu Baránkovi
              </a>
            </li>
            <li>
              <a href="/kontakt" className="hover:text-primary">
                Konzultace a kontakt
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-label-md text-primary">
            Data
          </div>
          <p className="text-body-md text-on-surface-variant mt-3">
            Ceny aktualizovány:{" "}
            <span className="text-on-surface font-mono">{lastUpdated}</span>
          </p>
          <p className="text-label-md text-on-surface-variant mt-2">
            Orientační kalkulace, ne závazná nabídka.
          </p>
        </div>
      </div>
      <div className="border-t border-outline-variant/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 text-label-md text-on-surface-variant flex flex-wrap items-center justify-between gap-2">
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
