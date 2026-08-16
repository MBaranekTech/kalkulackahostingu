import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-surface/45 border-b border-outline-variant/50 backdrop-blur-xl sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="shrink-0 rounded-sm p-1 transition-colors hover:bg-on-surface/10"
          aria-label="Kalkulačka hostingu, domů"
        >
          <Image
            src="/logo-mark.svg"
            alt=""
            height={64}
            width={64}
            loading="eager"
            className="h-9 w-9 sm:h-10 sm:w-10"
          />
        </Link>
        <nav className="hidden sm:flex items-center gap-1 text-label-md font-mono text-on-surface-variant">
          <Link href="/#kalkulacka" className="rounded-sm px-3 py-2 hover:bg-on-surface/10 hover:text-on-surface transition-colors">
            Kalkulačka
          </Link>
          <Link href="/clanky" className="rounded-sm px-3 py-2 hover:bg-on-surface/10 hover:text-on-surface transition-colors">
            Články
          </Link>
          <Link href="/o-mne" className="rounded-sm px-3 py-2 hover:bg-on-surface/10 hover:text-on-surface transition-colors">
            O mně
          </Link>
          <Link href="/kontakt" className="rounded-sm px-3 py-2 border border-outline hover:border-primary hover:text-on-surface transition-colors">
            Kontakt
          </Link>
        </nav>
        <Link
          href="/kontakt"
          className="sm:hidden font-mono text-xs border-b border-primary"
        >
          Kontakt
        </Link>
      </div>
    </header>
  );
}
