import { CONTAINER_CLASS } from "../constants";
import { discoveryHighlights } from "../data";
import { SectionHeading } from "../ui/SectionHeading";

export function DiscoverySection() {
  return (
    <section className={`${CONTAINER_CLASS} mt-32`}>
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeading
          eyebrow="Discovery"
          title="What is their deal?"
          description="Conspectus distills nuanced narratives so you can understand influence, alliances, and fault lines at a glance."
          align="center"
        />
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {discoveryHighlights.map((item) => (
          <div
            key={item.title}
            className="group rounded-3xl border border-slate-200/70 bg-white/90 p-6 text-left shadow-sm shadow-slate-900/10 transition hover:-translate-y-[2px] hover:shadow-[0_20px_45px_rgba(15,23,42,0.1)]"
          >
            <div
              className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-white shadow-lg shadow-slate-900/20`}
            >
              {item.icon}
            </div>
            <div className="mt-5 space-y-2">
              <h3 className="text-lg font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="text-sm text-slate-500">{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
