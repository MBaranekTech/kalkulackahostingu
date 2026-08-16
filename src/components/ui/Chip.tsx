import type { ReactNode } from "react";

type Tone = "neutral" | "primary" | "success" | "warning" | "error";

interface ChipProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}

const toneClass: Record<Tone, string> = {
  neutral: "border-outline bg-surface-container text-on-surface-variant",
  primary: "border-on-surface bg-primary text-on-primary",
  success: "border-on-surface bg-success-container text-on-success-container",
  warning: "border-tertiary bg-tertiary-container text-on-tertiary-container",
  error: "border-error bg-error-container text-on-error-container",
};

export function Chip({ children, tone = "neutral", className = "" }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-xs border px-2 py-1 font-mono text-[10px] uppercase whitespace-nowrap ${toneClass[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
