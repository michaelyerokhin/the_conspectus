import Image from "next/image";
import Link from "next/link";

import { CONTAINER_CLASS } from "../constants";
import { navLinks } from "../data";
import { SearchIcon, UserIcon } from "../icons";
import { getCurrentUser } from "../../lib/auth";
import type { CurrentUser } from "../../lib/types";

export async function SiteHeader() {
  const user : CurrentUser | null = await getCurrentUser();
  return (
    <header className="sticky top-0 z-50 border-b border-transparent bg-[#f6f8fc] backdrop-blur-xl">
      <div className={`${CONTAINER_CLASS} flex items-center gap-4 py-4`}>
        <a
          className="flex flex-shrink-0 items-center gap-3 text-lg font-semibold text-slate-900"
          href="#"
        >
          <span className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-900/10">
            <Image
              alt="Conspectus"
              height={24}
              src="/conspectus-logo.png"
              width={24}
            />
          </span>
          Conspectus
        </a>

        <nav className="hidden flex-1 items-center justify-center gap-6 text-sm font-medium text-slate-500 max-[1387px]:mx-auto max-[860px]:hidden md:flex">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href= "./knowledgeGraph"
                  className="relative whitespace-nowrap transition hover:text-slate-900 after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-0 after:rounded-full after:bg-slate-900/70 after:transition-[width] hover:after:w-full"
                  
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button className="hidden items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:-translate-y-[1px] hover:border-slate-300 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10 max-[1387px]:hidden lg:flex">
            <SearchIcon />
            Profiles
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(15,23,42,0.25)] transition hover:-translate-y-[1px] hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30">
            Take Quiz
          </button>
          {user ? (
            <Link
              href="/"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-[1px] hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10"
            >
              {<UserIcon />}
              <span className="sr-only">View account</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:-translate-y-[1px] hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10"
            >
              <UserIcon />
              Log In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
