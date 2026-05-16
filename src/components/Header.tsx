import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <g fill="hsl(var(--md-primary))">
        <circle cx="20" cy="13" r="6" />
        <circle cx="32" cy="9" r="8" />
        <circle cx="44" cy="13" r="6" />
        <rect x="14" y="12" width="36" height="8" rx="4" />
      </g>
      <rect
        x="14"
        y="24"
        width="8"
        height="36"
        rx="2"
        fill="hsl(var(--md-primary))"
      />
      <rect
        x="28"
        y="32"
        width="8"
        height="28"
        rx="2"
        fill="hsl(var(--md-primary))"
      />
      <rect
        x="42"
        y="40"
        width="8"
        height="20"
        rx="2"
        fill="hsl(var(--md-success))"
      />
    </svg>
  );
}

export function Header() {
  return (
    <header className="border-b border-outline-variant bg-surface/80 backdrop-blur sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <LogoMark className="w-8 h-8 shrink-0" />
          <span className="text-title-md text-on-surface group-hover:text-primary transition-colors">
            KalkulackaHostingu<span className="text-primary">.cz</span>
          </span>
        </Link>
        <div className="flex items-center gap-1">
          <nav className="hidden sm:flex items-center gap-1 text-label-lg text-on-surface-variant">
            <Link
              href="/#kalkulacka"
              className="md-state-layer rounded-full px-3 py-1.5 hover:text-on-surface"
            >
              Kalkulačka
            </Link>
            <Link
              href="/clanky"
              className="md-state-layer rounded-full px-3 py-1.5 hover:text-on-surface"
            >
              Články
            </Link>
            <Link
              href="/o-mne"
              className="md-state-layer rounded-full px-3 py-1.5 hover:text-on-surface"
            >
              O mně
            </Link>
            <Link
              href="/#kontakt"
              className="md-state-layer rounded-full px-3 py-1.5 hover:text-on-surface"
            >
              Kontakt
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
