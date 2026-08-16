"use client";

import { useId } from "react";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  formatValue?: (n: number) => string;
  onChange: (next: number) => void;
  hint?: string;
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  formatValue,
  onChange,
  hint,
}: SliderProps) {
  const id = useId();
  const percent = ((value - min) / (max - min)) * 100;
  const display = formatValue ? formatValue(value) : String(value);

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <label
          htmlFor={id}
          className="text-title-sm font-semibold text-on-surface"
        >
          {label}
        </label>
        <span className="text-title-md text-primary tabular-nums">
          {display}
        </span>
      </div>

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="m3-slider"
        style={
          {
            // Used by the CSS gradient below.
            ["--slider-fill" as string]: `${percent}%`,
          } as React.CSSProperties
        }
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={label}
      />

      {hint && (
        <p className="text-label-md text-on-surface-variant">{hint}</p>
      )}

      <style jsx>{`
        .m3-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 24px;
          background: transparent;
          cursor: pointer;
        }
        .m3-slider::-webkit-slider-runnable-track {
          height: 2px;
          background: linear-gradient(
            to right,
            var(--color-primary) 0%,
            var(--color-primary) var(--slider-fill),
            var(--color-outline-variant) var(--slider-fill),
            var(--color-outline-variant) 100%
          );
        }
        .m3-slider::-moz-range-track {
          height: 2px;
          background: var(--color-outline-variant);
        }
        .m3-slider::-moz-range-progress {
          height: 2px;
          background: var(--color-primary);
        }
        .m3-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border: 2px solid var(--color-on-surface);
          border-radius: 999px;
          background: var(--color-primary);
          margin-top: -8px;
          transition:
            transform 150ms var(--md-motion-emphasized);
        }
        .m3-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border: 2px solid var(--color-on-surface);
          border-radius: 999px;
          background: var(--color-primary);
        }
        .m3-slider:hover::-webkit-slider-thumb {
          transform: scale(1.08);
        }
        .m3-slider:focus-visible::-webkit-slider-thumb {
          outline: 3px solid hsl(var(--md-primary));
          outline-offset: 2px;
        }
        .m3-slider:active::-webkit-slider-thumb {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
