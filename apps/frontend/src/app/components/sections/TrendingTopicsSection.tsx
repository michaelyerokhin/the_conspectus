import { CONTAINER_CLASS } from "../constants";
import { trendingTopics } from "../data";
import { ArrowRightIcon } from "../icons";
import { TopicCard } from "../cards/TopicCard";
import { SectionHeading } from "../ui/SectionHeading";

export function TrendingTopicsSection() {
  const [featuredTopic, ...otherTopics] = trendingTopics;

  if (!featuredTopic) {
    return null;
  }

  return (
    <section className="relative mt-32">
      <div className={`${CONTAINER_CLASS} max-w-6xl`}>
        <div className="overflow-hidden rounded-[44px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-12 text-slate-100 sm:px-10 lg:px-14">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <SectionHeading
              eyebrow="Trending topics"
              title="Track the debates shaping global power"
              description="Follow the leaders, events, and arguments moving markets, policy, and culture."
              tone="light"
              singleLine
            />
            <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-[2px] hover:bg-white/20">
              View topic index
              <ArrowRightIcon />
            </button>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
            <TopicCard featured topic={featuredTopic} variant="dark" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {otherTopics.map((topic) => (
                <TopicCard key={topic.title} topic={topic} variant="dark" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
