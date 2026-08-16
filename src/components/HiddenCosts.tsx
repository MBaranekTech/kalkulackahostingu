"use client";

import type { CalculationResult } from "@/lib/types";
import { Card } from "./ui/Card";

interface Props {
  results: CalculationResult[];
}

export function HiddenCosts({ results }: Props) {
  const withCosts = results.filter((r) => r.warnings.length > 0);
  if (withCosts.length === 0) return null;

  return (
    <Card variant="filled" className="bg-tertiary-container/45 p-5 border border-tertiary/60">
      <div className="flex items-start gap-3">
        <div className="font-mono text-xs pt-1" aria-hidden>!</div>
        <div className="flex-1">
          <h3 className="text-title-md text-on-tertiary-container">
            Skryté náklady, na které pozor
          </h3>
          <p className="text-body-md text-on-surface-variant mt-1">
            Tyto položky se v ceníku poskytovatele snadno přehlédnou, ale
            v reálné faktuře přidají dost peněz.
          </p>

          <div className="mt-4 space-y-4">
            {withCosts.map((r) => (
              <section key={r.provider.id}>
                <h4 className="text-title-sm text-on-surface">
                  {r.provider.name}
                </h4>
                <ul className="mt-1 space-y-1 text-body-md text-on-surface">
                  {r.warnings.map((w) => (
                    <li key={w} className="flex gap-2">
                      <span aria-hidden className="text-tertiary">•</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
