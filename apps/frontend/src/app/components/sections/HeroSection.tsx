import Image from "next/image";

import { CONTAINER_CLASS } from "../constants";
import { heroStats, partnerLogos } from "../data";
import { ArrowRightIcon } from "../icons";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-24 pt-24">
      <div className={`${CONTAINER_CLASS} flex flex-col items-center text-center`}>
        <div className="group relative overflow-hidden rounded-[32px] border border-white/60 bg-white/80 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.15)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.18)]">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-100 via-white to-slate-200 opacity-0 transition duration-300 group-hover:opacity-100" />
          <Image
            alt="Conspectus logo"
            height={64}
            priority
            src="/conspectus-logo.png"
            width={64}
          />
        </div>
        <div className="mt-6 max-w-3xl space-y-6">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Navigate leaders, debates, and global power with clarity.
          </h1>
          <p className="text-lg leading-relaxed text-slate-500/90 sm:text-xl">
            Conspectus distills thousands of signals into actionable briefings
            so your team can align strategy, brief stakeholders, and act faster.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_30px_rgba(15,23,42,0.35)] transition hover:-translate-y-[2px] hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30">
            Explore leaders
            <ArrowRightIcon />
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-[2px] hover:border-slate-300 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10">
            Book a demo
            <ArrowRightIcon />
          </button>
        </div>
        <TrustedByStrip />
        <div className="mt-16 grid w-full gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <HeroQuizCard />
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="group rounded-3xl border border-white/60 bg-white/80 px-6 py-5 text-left shadow-sm shadow-slate-900/10 transition hover:-translate-y-[3px] hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  {stat.label}
                </p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-slate-500">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustedByStrip() {
  return (
    <div className="mt-14 flex w-full flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-400/80 sm:gap-x-14">
      <span className="text-slate-400/60">Trusted by teams at</span>
      {partnerLogos.map((partner) => (
        <span key={partner} className="text-slate-500/80">
          {partner}
        </span>
      ))}
    </div>
  );
}

function HeroQuizCard() {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-slate-200/70 bg-white/85 p-8 text-left shadow-[0_18px_60px_rgba(15,23,42,0.1)] transition hover:-translate-y-1">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 via-white to-slate-100 opacity-0 transition duration-300 hover:opacity-100" />
      <h2 className="text-2xl font-semibold text-slate-900">Not sure where to start?</h2>
      <p className="mt-4 text-base text-slate-500">
        Take the 5-minute alignment quiz to surface the leaders, events, and
        narratives that matter most for your team.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-[1px] hover:bg-slate-800">
          Start quiz
          <ArrowRightIcon />
        </button>
        <button className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200/80 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900">
          Try sample results
        </button>
      </div>
    </div>
  );
}
