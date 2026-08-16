"use client";

import type { Scenario, ScenarioId } from "@/lib/types";

interface Props {
  scenarios: Scenario[];
  selected: ScenarioId;
  onSelect: (id: ScenarioId) => void;
}

export function ScenarioPicker({ scenarios, selected, onSelect }: Props) {
  return (
    <div
      role="radiogroup"
      aria-label="Typ projektu"
      className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto"
    >
      {scenarios.map((s) => {
        const active = s.id === selected;
        return (
          <button
            key={s.id}
            role="radio"
            aria-checked={active}
            type="button"
            onClick={() => onSelect(s.id)}
            className={`
              md-state-layer
              min-h-16 flex items-center gap-3 text-left px-4 py-3 rounded-sm border
              transition-colors duration-150
              ${
                active
                  ? "border-primary bg-primary/15 text-on-surface"
                  : "border-outline bg-surface-lowest/10 text-on-surface hover:border-on-surface"
              }
            `}
          >
            <span
              aria-hidden
              className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${active ? "border-primary" : "border-outline"}`}
            >
              {active && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-title-sm leading-tight">{s.name}</div>
              <div className="mt-1 text-label-md text-on-surface-variant">
                {s.description}
              </div>
            </div>
            <span aria-hidden className="text-xl">{s.emoji}</span>
          </button>
        );
      })}
    </div>
  );
}
