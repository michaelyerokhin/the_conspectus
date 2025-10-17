import { CONTAINER_CLASS } from "../constants";
import { focusAreas, profileIncludes } from "../data";
import { SectionHeading } from "../ui/SectionHeading";
import { ArrowRightIcon } from "../icons";

export function FocusSection() {
  return (
    <section className={`${CONTAINER_CLASS} mt-28`}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="rounded-[32px] border border-slate-200/70 bg-white/85 p-10 shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
          <SectionHeading
            eyebrow="Inside the library"
            title="What you will find"
            description="Scan regional power players, decode corporate influence, and understand emerging movements in minutes."
          />
          <div className="mt-8 space-y-6">
            {focusAreas.map((area) => (
              <div key={area.title} className="flex gap-4">
                <div
                  className={`mt-1 h-12 w-1 rounded-full bg-gradient-to-b ${area.accent}`}
                />
                <div>
                  <p className="text-base font-semibold text-slate-900">
                    {area.title}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">{area.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200/70 bg-white/85 p-10 shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
          <h3 className="text-xl font-semibold text-slate-900">
            Each profile includes
          </h3>
          <ul className="mt-6 space-y-4 text-sm text-slate-500">
            {profileIncludes.map((item) => (
              <li className="flex items-start gap-3" key={item}>
                <span className="mt-[6px] h-2.5 w-2.5 flex-none rounded-full bg-blue-500/90" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-5 text-sm text-slate-600">
            Conspectus Edge unlocks advanced filters, saved briefings, and
            automated alerts for your leadership team.
          </div>
          <div className="mt-6">
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-[1px] hover:border-slate-300 hover:text-slate-900">
              Explore plans
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
