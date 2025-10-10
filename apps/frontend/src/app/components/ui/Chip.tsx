import type { ReactNode } from "react";

type ChipProps = {
  children: ReactNode;
  muted?: boolean;
  inverted?: boolean;
};

export function Chip({ children, muted, inverted }: ChipProps) {
  let styles = "border-slate-200 bg-white text-slate-600";

  if (inverted) {
    styles = muted
      ? "border-white/10 bg-white/5 text-white/70"
      : "border-white/20 bg-white/10 text-white/80";
  } else if (muted) {
    styles = "border-slate-200 bg-slate-100 text-slate-500";
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {children}
    </span>
  );
}
