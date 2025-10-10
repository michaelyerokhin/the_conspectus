import { CONTAINER_CLASS } from "../constants";
import { libraryCards, libraryFilters } from "../data";
import { SearchIcon, ArrowRightIcon } from "../icons";
import { LibraryCard } from "../cards/LibraryCard";
import { SectionHeading } from "../ui/SectionHeading";

export function LibrarySection() {
  return (
    <section className={`${CONTAINER_CLASS} mt-28`} id="library">
      <div className="rounded-[40px] border border-slate-200/60 bg-white/85 p-8 shadow-[0_24px_65px_rgba(15,23,42,0.08)] sm:p-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <SectionHeading
            eyebrow="Library"
            title="Browse our intelligence library"
            description="Dive into curated dossiers covering global figures, power blocs, and cultural drivers."
          />
          <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
            <div className="flex flex-nowrap gap-2 overflow-x-auto rounded-full border border-slate-200/60 bg-slate-50/80 p-1 text-sm text-slate-500">
              {libraryFilters.map((filter, index) => (
                <button
                  key={filter}
                  aria-pressed={index === 0}
                  className={`rounded-full px-4 py-2 font-medium transition ${
                    index === 0
                      ? "bg-white text-slate-900 shadow-sm"
                      : "hover:bg-white/80 hover:text-slate-900"
                  }`}
                  type="button"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {libraryCards.map((card) => (
            <LibraryCard key={card.name} card={card} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button className="group inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-[2px] hover:border-slate-300 hover:text-slate-900">
            View all profiles
            <span className="transition duration-200 group-hover:translate-x-1">
              <ArrowRightIcon />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
