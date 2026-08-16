"use client";

import { useId } from "react";

interface SwitchProps {
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  description?: string;
}

export function Switch({ label, checked, onChange, description }: SwitchProps) {
  const id = useId();
  return (
    <label
      htmlFor={id}
      className="flex items-start gap-3 cursor-pointer select-none py-3 border-b border-outline-variant md-state-layer text-on-surface"
    >
      <span className="relative mt-0.5 grid h-6 w-6 shrink-0 place-items-center">
        <input
          id={id}
          type="checkbox"
          className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-xs border-2 border-outline bg-transparent checked:border-primary checked:bg-primary"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span
          aria-hidden
          className="pointer-events-none relative text-sm font-bold text-on-primary opacity-0 peer-checked:opacity-100"
        >
          ✓
        </span>
      </span>
      <span className="flex-1">
        <span className="block text-title-sm font-semibold">{label}</span>
        {description && (
          <span className="block text-label-md text-on-surface-variant mt-0.5">
            {description}
          </span>
        )}
      </span>
    </label>
  );
}
