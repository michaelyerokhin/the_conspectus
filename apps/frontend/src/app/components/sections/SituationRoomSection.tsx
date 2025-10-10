import { CONTAINER_CLASS } from "../constants";
import { situationSpotlight } from "../data";
import { ClockIcon, MetricIcon, UsersIcon } from "../icons";
import { Chip } from "../ui/Chip";
import { SectionHeading } from "../ui/SectionHeading";
import { ArrowRightIcon } from "../icons";

export function SituationRoomSection() {
  return (
    <section className={`${CONTAINER_CLASS} mt-28`} id="situation-room">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SectionHeading
          eyebrow="Live briefing"
          title="The Situation Room"
          description="Rapid intelligence on pivotal developments, updated in real time by our analyst desk."
        />
        <button className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-[1px] hover:border-slate-300 hover:text-slate-900">
          View all updates
          <ArrowRightIcon />
        </button>
      </div>

      <article className="relative mt-10 overflow-hidden rounded-[36px] border border-slate-200/70 bg-white/85 p-10 shadow-[0_24px_60px_rgba(15,23,42,0.1)] transition hover:-translate-y-1">
        <div className="absolute inset-y-0 right-[-20%] -z-10 hidden w-[60%] rounded-full bg-[radial-gradient(circle_at_center,_rgba(79,70,229,0.18),transparent_70%)] blur-3xl lg:block" />
        <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-600">
          {situationSpotlight.badges.map((badge) => (
            <Chip key={badge}>{badge}</Chip>
          ))}
          <div className="flex items-center gap-2 text-slate-400">
            <ClockIcon />
            <span>{situationSpotlight.timestamp}</span>
          </div>
        </div>
        <h3 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900">
          {situationSpotlight.title}
        </h3>
        <p className="mt-4 max-w-3xl text-lg text-slate-500">
          {situationSpotlight.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-2 text-sm">
          {situationSpotlight.tags.map((tag) => (
            <Chip key={tag} muted>
              {tag}
            </Chip>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <MetricIcon className="h-4 w-4 text-slate-400" />
            <span>4 leaders tracked</span>
          </div>
          <div className="flex items-center gap-2">
            <UsersIcon />
            <span>Brief prepared for executive teams</span>
          </div>
        </div>

        <div className="mt-8">
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(15,23,42,0.3)] transition hover:-translate-y-[1px] hover:bg-slate-800">
            Read briefing
            <ArrowRightIcon />
          </button>
        </div>
      </article>
    </section>
  );
}
