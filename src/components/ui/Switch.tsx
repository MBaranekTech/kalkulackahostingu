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
      className="flex items-start justify-between gap-4 cursor-pointer select-none py-2 rounded-lg md-state-layer text-on-surface"
    >
      <span className="flex-1">
        <span className="block text-title-sm">{label}</span>
        {description && (
          <span className="block text-label-md text-on-surface-variant mt-0.5">
            {description}
          </span>
        )}
      </span>
      <span className="relative inline-flex items-center shrink-0">
        <input
          id={id}
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span
          aria-hidden
          className={`
            h-8 rounded-full border-2 transition-colors duration-200
            ${
              checked
                ? "bg-primary border-primary"
                : "bg-surface-variant border-outline"
            }
          `}
          style={{ width: 52 }}
        />
        <span
          aria-hidden
          className={`
            absolute left-1 rounded-full bg-on-primary
            transition-all duration-200 ease-out
            ${
              checked
                ? "w-6 h-6 translate-x-5 bg-on-primary"
                : "w-4 h-4 translate-x-0 bg-outline"
            }
          `}
        />
      </span>
    </label>
  );
}
