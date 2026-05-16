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
      className="grid grid-cols-2 sm:grid-cols-4 gap-3"
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
              text-left p-4 rounded-xl
              transition-all duration-200 ease-out
              ${
                active
                  ? "bg-primary-container text-on-primary-container shadow-elev-1"
                  : "bg-surface-container text-on-surface hover:bg-surface-high"
              }
            `}
          >
            <div className="text-2xl mb-2" aria-hidden>
              {s.emoji}
            </div>
            <div className="text-title-md leading-tight">{s.name}</div>
            <div
              className={`mt-1 text-label-md ${
                active ? "text-on-primary-container/80" : "text-on-surface-variant"
              }`}
            >
              {s.description}
            </div>
          </button>
        );
      })}
    </div>
  );
}
