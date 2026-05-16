"use client";

import type { CalculationResult } from "@/lib/types";
import { ProviderCard } from "./ProviderCard";

interface Props {
  results: CalculationResult[];
}

export function ResultsTable({ results }: Props) {
  const cheapest = results[0]?.monthlyPriceCZK ?? 0;

  return (
    <div className="space-y-3">
      {results.map((r, i) => (
        <ProviderCard
          key={r.provider.id}
          result={r}
          rank={i + 1}
          isCheapest={i === 0}
          priceRatio={cheapest > 0 ? r.monthlyPriceCZK / cheapest : 1}
        />
      ))}
    </div>
  );
}
