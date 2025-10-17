import type { Topic } from "../data";
import { ArrowRightIcon, MetricIcon } from "../icons";
import { Chip } from "../ui/Chip";

type TopicCardProps = {
  topic: Topic;
  featured?: boolean;
  variant?: "light" | "dark";
};

export function TopicCard({
  topic,
  featured,
  variant = "light",
}: TopicCardProps) {
  const isDark = variant === "dark";

  return (
    <article
      className={`group flex h-full flex-col rounded-3xl border p-6 transition ${featured ? "lg:p-8" : ""} ${
        isDark
          ? "border-white/10 bg-white/5 text-slate-100 shadow-[0_20px_55px_rgba(15,23,42,0.4)] hover:-translate-y-[3px] hover:bg-white/8"
          : "border-slate-200 bg-white text-slate-900 shadow-sm shadow-slate-200/60 hover:-translate-y-[3px] hover:shadow-[0_20px_55px_rgba(15,23,42,0.12)]"
      }`}
    >
      <div className="flex flex-wrap gap-2 text-xs font-semibold">
        {topic.badges.map((badge) => (
          <Chip inverted={isDark} key={badge}>
            {badge}
          </Chip>
        ))}
      </div>
      <h3
        className={`mt-6 text-2xl font-semibold ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        {topic.title}
      </h3>
      <p
        className={`mt-3 text-sm ${
          isDark ? "text-slate-200/80" : "text-slate-500"
        } sm:text-base`}
      >
        {topic.summary}
      </p>
      <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium">
        {topic.tags.map((tag) => (
          <Chip inverted={isDark} key={tag} muted>
            {tag}
          </Chip>
        ))}
      </div>
      <div
        className={`mt-8 flex flex-wrap items-center justify-between gap-4 text-sm ${
          isDark ? "text-slate-200/70" : "text-slate-500"
        }`}
      >
        <div className="flex flex-wrap gap-6">
          {topic.metrics.map((metric) => (
            <div className="flex items-center gap-2" key={metric.label}>
              <MetricIcon
                className={isDark ? "h-4 w-4 text-white/40" : "h-4 w-4 text-slate-400"}
              />
              <span
                className={`font-semibold ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                {metric.value}
              </span>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
        <span className={`text-xs ${isDark ? "text-slate-200/60" : "text-slate-400"}`}>
          {topic.updated}
        </span>
      </div>
      <div className="mt-auto pt-6">
        <button
          className={`group/btn inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${
            isDark
              ? "border border-white/20 bg-white/10 text-white hover:bg-white/20"
              : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-900"
          }`}
        >
          {featured ? "Explore topic" : "Open briefing"}
          <span className="transition group-hover/btn:translate-x-1">
            <ArrowRightIcon />
          </span>
        </button>
      </div>
    </article>
  );
}
