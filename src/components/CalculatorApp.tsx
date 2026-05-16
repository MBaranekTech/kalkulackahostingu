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
    <div className="flex items-center gap-3 mb-4">
      <span
        aria-hidden
        className="grid place-items-center w-8 h-8 rounded-full bg-primary text-on-primary text-label-lg tabular-nums shrink-0"
      >
        {step}
      </span>
      <div>
        <h2 className="text-title-lg text-on-surface">{title}</h2>
        {hint && (
          <p className="text-label-md text-on-surface-variant">{hint}</p>
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
    <div id="kalkulacka" className="space-y-10">
      {/* Step 1: Scenario */}
      <section>
        <StepLabel step={1} title="Vyberte typ projektu" />
        <ScenarioPicker
          scenarios={scenarios}
          selected={scenarioId}
          onSelect={handleScenarioChange}
        />
      </section>

      {/* Steps 2 & 3 — sliders on the left, results on the right (desktop) */}
      <section className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <StepLabel
            step={2}
            title="Upřesněte parametry"
            hint="Slidery můžete kdykoliv upravit — výsledky se přepočítají hned."
          />
          <Card variant="filled" className="p-5">
            <InputSliders value={input} onChange={setInput} />
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <StepLabel step={3} title="Výsledky" />
            {savings > 0 && (
              <div className="text-right">
                <div className="text-label-md text-on-surface-variant">
                  Úspora oproti nejdražšímu
                </div>
                <div className="text-title-lg text-success tabular-nums">
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
