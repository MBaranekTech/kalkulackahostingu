import type { HTMLAttributes, ReactNode } from "react";

type Elevation = 0 | 1 | 2 | 3;

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  elevation?: Elevation;
  /** "filled" uses a tinted surface; "outlined" uses a border on plain surface. */
  variant?: "filled" | "outlined" | "elevated";
}

const elevationClass: Record<Elevation, string> = {
  0: "",
  1: "shadow-elev-1",
  2: "shadow-elev-2",
  3: "shadow-elev-3",
};

export function Card({
  children,
  elevation = 1,
  variant = "elevated",
  className = "",
  ...rest
}: CardProps) {
  const base = "rounded-md text-on-surface transition-shadow duration-200";

  const variantClass =
    variant === "outlined"
      ? "bg-surface/75 border border-outline-variant"
      : variant === "filled"
        ? "bg-surface-container/75"
        : `bg-surface-lowest/75 ${elevationClass[elevation]}`;

  return (
    <div className={`${base} ${variantClass} ${className}`} {...rest}>
      {children}
    </div>
  );
}
