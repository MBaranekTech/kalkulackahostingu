import Link from "next/link";
import { Card } from "./ui/Card";

export function ContactCTA() {
  return (
    <Card
      variant="filled"
      elevation={0}
      className="p-6 sm:p-8 bg-surface/75 text-on-surface border border-outline-variant/60 backdrop-blur-xl"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div>
          <div className="text-label-md text-primary mb-2">Konzultace / 30 minut</div>
          <h3 className="text-headline-sm font-semibold text-on-surface">
            Potřebujete vybrat hosting nebo snížit náklady?
          </h3>
          <p className="text-body-md text-on-surface-variant mt-2 max-w-md">
            Projdeme požadavky projektu, porovnáme VPS, český hosting a AWS a
            navrhneme provoz, který odpovídá rozpočtu i rizikům.
          </p>
        </div>
        <Link
          href="/kontakt"
          className="
            md-state-layer
            inline-flex items-center justify-center gap-2
            rounded-sm px-6 py-3
            bg-on-surface text-background
            text-label-lg font-semibold border border-on-surface
            hover:bg-primary hover:border-primary hover:text-on-primary transition-colors duration-150
            shrink-0
          "
        >
          Více o konzultaci →
        </Link>
      </div>
    </Card>
  );
}
