import type { LibraryCardData } from "../data";
import { ArrowRightIcon } from "../icons";

type LibraryCardProps = {
  card: LibraryCardData;
};

export function LibraryCard({ card }: LibraryCardProps) {
  return (
    <article
      className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${card.gradient} p-6 text-white shadow-[0_18px_40px_rgba(15,23,42,0.15)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.2)]`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.14),transparent_55%)] opacity-0 transition group-hover:opacity-100" />
      <div className="relative inline-flex rounded-full border border-white/40 bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em]">
        {card.category}
      </div>
      <h3 className="relative mt-8 text-2xl font-semibold">{card.name}</h3>
      <p className="relative mt-2 text-sm text-white/85">{card.role}</p>
      <div className="relative mt-10 flex items-center justify-between text-sm text-white/80">
        <span>{card.stat}</span>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 transition group-hover:-translate-y-[3px]">
          <ArrowRightIcon />
        </span>
      </div>
    </article>
  );
}
