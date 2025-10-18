import Image from "next/image";

import { CONTAINER_CLASS } from "../constants";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-slate-200/60 bg-white/80">
      <div
        className={`${CONTAINER_CLASS} flex flex-col gap-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between`}
      >
        <div className="flex items-center gap-3 text-slate-600">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white shadow-sm">
            <Image alt="Conspectus" height={20} src="/conspectus-logo.png" width={20} />
          </span>
          <div>
            <p className="font-semibold text-slate-900">Conspectus</p>
            <p className="text-xs text-slate-500">
              Structured intelligence for leadership teams.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <a className="transition hover:text-slate-900" href="#">
            Privacy
          </a>
          <a className="transition hover:text-slate-900" href="#">
            Terms
          </a>
          <a className="transition hover:text-slate-900" href="#">
            Contact
          </a>
        </div>
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} Conspectus. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
