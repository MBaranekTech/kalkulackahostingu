"use client";

import { useMemo, useState } from "react";
import { exchangeRate, providers, scenarios } from "@/lib/providers";
import type { CalculatorInput, ScenarioId } from "@/lib/types";
import { calculateAll, formatCZK } from "@/lib/calculator";
import { ScenarioPicker } from "./ScenarioPicker";
import { InputSliders } from "./InputSliders";
import { ResultsTable } from "./ResultsTable";
import { Recommendation } from "./Recommendation";
import { HiddenCosts } from "./HiddenCosts";
import { Card } from "./ui/Card";

interface StepLabelProps {
  step: number;
  title: string;
  hint?: string;
}

function StepLabel({ step, title, hint }: StepLabelProps) {
  return (
    <div className="mb-6 text-center">
      <div>
        <h2 className="text-title-lg sm:text-headline-sm font-semibold text-on-surface">
          {step}. {title}
        </h2>
        {hint && (
          <p className="mt-2 text-label-md text-on-surface-variant">{hint}</p>
        )}
      </div>
    </div>
  );
}

export function CalculatorApp() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("wordpress");
  const initial =
    scenarios.find((s) => s.id === "wordpress")?.defaults ??
    scenarios[0].defaults;
  const [input, setInput] = useState<CalculatorInput>(initial);

  const handleScenarioChange = (id: ScenarioId) => {
    setScenarioId(id);
    const next = scenarios.find((s) => s.id === id);
    if (next) setInput(next.defaults);
  };

  const results = useMemo(
    () => calculateAll(input, providers, exchangeRate),
    [input],
  );

  const cheapest = results[0];
  const mostExpensive = results[results.length - 1];
  const savings = mostExpensive && cheapest
    ? mostExpensive.monthlyPriceCZK - cheapest.monthlyPriceCZK
    : 0;

  return (
    <div id="kalkulacka" className="space-y-14 scroll-mt-24">
      {/* Step 1: Scenario */}
      <section>
        <StepLabel step={1} title="Vyberte typ projektu" />
        <ScenarioPicker
          scenarios={scenarios}
          selected={scenarioId}
          onSelect={handleScenarioChange}
        />
      </section>

      <section className="space-y-14">
        <div className="min-w-0 max-w-3xl mx-auto">
          <StepLabel
            step={2}
            title="Upřesněte parametry"
            hint="Slidery můžete kdykoliv upravit — výsledky se přepočítají hned."
          />
          <Card variant="filled" className="p-5 sm:p-7 border border-outline/70 bg-surface-lowest/20">
            <InputSliders value={input} onChange={setInput} />
          </Card>
        </div>

        <div className="min-w-0 space-y-4">
          <div>
            <StepLabel step={3} title="Výsledky" />
            {savings > 0 && (
              <div className="-mt-3 mb-6 text-center">
                <div className="text-label-md text-on-surface-variant">
                  Úspora oproti nejdražšímu
                </div>
                <div className="mt-1 text-title-lg font-semibold text-primary tabular-nums">
                  {formatCZK(savings)} / měsíc
                </div>
              </div>
            )}
          </div>

          <Recommendation results={results} scenarioId={scenarioId} />
          <ResultsTable results={results} />
          <HiddenCosts results={results} />
        </div>
      </section>
    </div>
  );
}
