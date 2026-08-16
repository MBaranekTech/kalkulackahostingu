"use client";

import type { CalculationResult, ScenarioId } from "@/lib/types";
import { Card } from "./ui/Card";
import { formatCZK } from "@/lib/calculator";

interface Props {
  results: CalculationResult[];
  scenarioId: ScenarioId;
}

function findBestMatch(
  results: CalculationResult[],
  scenarioId: ScenarioId,
): CalculationResult {
  // Prefer providers that list this scenario in bestFor; among those pick the
  // cheapest. Fall back to overall cheapest.
  const cheapest = results[0];
  const recommended = results
    .filter((r) => r.provider.bestFor.includes(scenarioId))
    .sort((a, b) => a.monthlyPriceCZK - b.monthlyPriceCZK)[0];
  return recommended ?? cheapest;
}

function reasonFor(result: CalculationResult, scenarioId: ScenarioId): string {
  const p = result.provider;
  const labels: Record<ScenarioId, string> = {
    static: "statický web",
    wordpress: "WordPress e-shop",
    api: "API + databázi",
    "high-traffic": "web s vysokou návštěvností",
  };
  const head = `Pro ${labels[scenarioId]} je ${p.name} dobrá volba`;
  const tail = p.strengths[0] ? ` — ${p.strengths[0].toLowerCase()}.` : ".";
  return head + tail;
}

export function Recommendation({ results, scenarioId }: Props) {
  if (results.length === 0) return null;
  const best = findBestMatch(results, scenarioId);
  const cheapest = results[0];
  const isAlsoCheapest = best.provider.id === cheapest.provider.id;

  return (
    <Card
      variant="filled"
      elevation={0}
      className="p-5 sm:p-6 bg-primary/10 border border-primary/70 border-l-4"
    >
      <div className="flex items-start gap-4">
        <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-primary text-primary text-sm" aria-hidden>✓</div>
        <div className="flex-1">
          <div className="text-label-md text-primary">
            Doporučení kalkulačky
          </div>
          <h3 className="mt-2 text-headline-sm font-semibold text-on-surface">
            {best.provider.name}
            <span className="block sm:inline text-on-surface-variant text-title-md sm:ml-2 font-normal">
              {formatCZK(best.monthlyPriceCZK)} / měsíc
            </span>
          </h3>
          <p className="mt-2 text-body-md text-on-surface-variant max-w-xl">
            {reasonFor(best, scenarioId)}
            {!isAlsoCheapest && (
              <>
                {" "}Nejlevnější varianta ({cheapest.provider.shortName} za{" "}
                {formatCZK(cheapest.monthlyPriceCZK)}) může být lacinější, ale
                pro tento typ projektu se hodí méně.
              </>
            )}
          </p>
        </div>
      </div>
    </Card>
  );
}
