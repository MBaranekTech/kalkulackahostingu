"use client";

import type { CalculatorInput } from "@/lib/types";
import { formatVisitors } from "@/lib/calculator";
import { Slider } from "./ui/Slider";
import { Switch } from "./ui/Switch";

interface Props {
  value: CalculatorInput;
  onChange: (next: CalculatorInput) => void;
}

export function InputSliders({ value, onChange }: Props) {
  const patch = (delta: Partial<CalculatorInput>) =>
    onChange({ ...value, ...delta });

  return (
    <div className="space-y-6">
      <Slider
        label="Měsíční návštěvnost"
        value={value.monthlyVisitors}
        min={1_000}
        max={1_000_000}
        step={1_000}
        formatValue={(n) => `${formatVisitors(n)} návštěv`}
        onChange={(monthlyVisitors) => patch({ monthlyVisitors })}
      />

      <Slider
        label="Velikost databáze"
        value={value.databaseGB}
        min={0}
        max={100}
        step={1}
        formatValue={(n) => `${n} GB`}
        onChange={(databaseGB) => patch({ databaseGB })}
      />

      <Slider
        label="Velikost storage"
        value={value.storageGB}
        min={0}
        max={500}
        step={1}
        formatValue={(n) => `${n} GB`}
        onChange={(storageGB) => patch({ storageGB })}
      />

      <Slider
        label="Měsíční data transfer"
        value={Number(value.transferTB.toFixed(2))}
        min={0}
        max={5}
        step={0.05}
        formatValue={(n) => `${n.toFixed(2)} TB`}
        onChange={(transferTB) => patch({ transferTB })}
      />

      <div className="pt-2 border-t border-outline-variant space-y-2">
        <Switch
          label="Potřebuji databázi"
          description="MySQL / Postgres pro WordPress, API, e-shop"
          checked={value.needsDatabase}
          onChange={(needsDatabase) => patch({ needsDatabase })}
        />
        <Switch
          label="Potřebuji CDN"
          description="Pro rychlejší doručení obrázků a statiky"
          checked={value.needsCDN}
          onChange={(needsCDN) => patch({ needsCDN })}
        />
      </div>
    </div>
  );
}
