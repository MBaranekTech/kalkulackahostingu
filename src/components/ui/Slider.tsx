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
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <label
          htmlFor={id}
          className="text-title-sm text-on-surface-variant"
        >
          {label}
        </label>
        <span className="font-mono text-title-md text-on-surface tabular-nums">
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
          height: 4px;
          border-radius: 999px;
          background: linear-gradient(
            to right,
            var(--color-primary) 0%,
            var(--color-primary) var(--slider-fill),
            var(--color-outline-variant) var(--slider-fill),
            var(--color-outline-variant) 100%
          );
        }
        .m3-slider::-moz-range-track {
          height: 4px;
          border-radius: 999px;
          background: var(--color-outline-variant);
        }
        .m3-slider::-moz-range-progress {
          height: 4px;
          border-radius: 999px;
          background: var(--color-primary);
        }
        .m3-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 999px;
          background: var(--color-primary);
          margin-top: -8px;
          box-shadow:
            0 0 0 0 hsl(var(--md-primary) / 0.15),
            0 1px 2px hsl(var(--md-on-surface) / 0.3);
          transition:
            box-shadow 150ms var(--md-motion-emphasized),
            transform 150ms var(--md-motion-emphasized);
        }
        .m3-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border: none;
          border-radius: 999px;
          background: var(--color-primary);
        }
        .m3-slider:hover::-webkit-slider-thumb {
          box-shadow:
            0 0 0 10px hsl(var(--md-primary) / 0.1),
            0 1px 2px hsl(var(--md-on-surface) / 0.3);
        }
        .m3-slider:focus-visible::-webkit-slider-thumb {
          outline: none;
          box-shadow:
            0 0 0 12px hsl(var(--md-primary) / 0.18),
            0 1px 2px hsl(var(--md-on-surface) / 0.3);
        }
        .m3-slider:active::-webkit-slider-thumb {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
