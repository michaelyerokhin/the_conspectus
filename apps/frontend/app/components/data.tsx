import type { ReactNode } from "react";

export type HeroStat = {
  label: string;
  value: string;
  detail: string;
};

export type LibraryCardData = {
  category: string;
  name: string;
  role: string;
  gradient: string;
  stat: string;
};

export type TopicMetric = {
  label: string;
  value: string;
};

export type Topic = {
  title: string;
  summary: string;
  badges: string[];
  tags: string[];
  metrics: TopicMetric[];
  updated: string;
  featured?: boolean;
};

export type DiscoveryHighlight = {
  title: string;
  body: string;
  accent: string;
  icon: ReactNode;
};

export type FocusArea = {
  title: string;
  body: string;
  accent: string;
};

export const navLinks = [
  {name :"Profiles" , href : "#"},
  {name : "Compare"  , href: "#",},
  {name : "Knowledge Graph", href: "./knowledgeGraph", },
  {name: "About", href :  "#"},
];

/** === Obviously, we'll backend this eventually === */
export const heroStats: HeroStat[] = [
  {
    label: "Leaders",
    value: "280+",
    detail: "profiles curated by analysts",
  },
  {
    label: "Topics",
    value: "65",
    detail: "deep-dive dossiers in rotation",
  },
  {
    label: "Signals",
    value: "1,200+",
    detail: "primary sources monitored weekly",
  },
];

export const partnerLogos = [
  "Foreign Affairs",
  "MIT Tech Review",
  "Politico",
  "Quartz",
  "The Economist",
];

export const situationSpotlight = {
  title:
    "US President Trump meets with EU leaders about fate of Russia Ukraine War",
  summary:
    "Historic diplomatic talks as world leaders gather to discuss the ongoing conflict and potential paths to de-escalation.",
  badges: ["Politics", "Briefing"],
  tags: [
    "Donald Trump",
    "Emmanuel Macron",
    "Giorgia Meloni",
    "Ursula von der Leyen",
  ],
  timestamp: "1 hour ago",
};

export const libraryFilters = [
  "All",
  "Politics",
  "Business",
  "Technology",
  "Security",
  "Culture",
];

export const libraryCards: LibraryCardData[] = [
  {
    category: "Politics",
    name: "Giorgia Meloni",
    role: "Prime Minister, Italy",
    stat: "Updated 2 days ago",
    gradient: "from-[#b91d57] via-[#d53f71] to-[#f97362]",
  },
  {
    category: "Politics",
    name: "Dick Durbin",
    role: "U.S. Senate Minority Whip",
    stat: "Senate profile refreshed weekly",
    gradient: "from-[#1d3eb9] via-[#3657d4] to-[#66a3ff]",
  },
  {
    category: "Politics",
    name: "Shehbaz Sharif",
    role: "Prime Minister of Pakistan",
    stat: "Coalition tracker live",
    gradient: "from-[#0f5132] via-[#1f8a45] to-[#4ade80]",
  },
  {
    category: "Technology",
    name: "Jensen Huang",
    role: "CEO, NVIDIA",
    stat: "Earnings call digest",
    gradient: "from-[#0e6246] via-[#1a8d5c] to-[#4ade80]",
  },
  {
    category: "Literature",
    name: "David Grossman",
    role: "Israeli Author",
    stat: "Cultural impact brief",
    gradient: "from-[#531db9] via-[#6a35d4] to-[#a855f7]",
  },
  {
    category: "Activism",
    name: "Malala Yousafzai",
    role: "Education Activist",
    stat: "Global advocacy map",
    gradient: "from-[#9f1239] via-[#db2777] to-[#f472b6]",
  },
];

export const trendingTopics: Topic[] = [
  {
    featured: true,
    title: "Israel-Gaza War",
    summary:
      "The evolving conflict between Israel and Hamas following the October 7 attacks, balancing ceasefire talks, humanitarian corridors, and regional diplomacy.",
    badges: ["Featured", "International Security"],
    tags: ["conflict", "middle-east", "gaza", "israel", "+2"],
    metrics: [
      { label: "Leaders", value: "4" },
      { label: "Events", value: "6" },
      { label: "Nuances", value: "12" },
    ],
    updated: "Updated about 2 months ago",
  },
  {
    title: "Taiwan Independence",
    summary:
      "Cross-strait relations with China, U.S. strategic ambiguity, and Taiwan's democratic autonomy remain at the center of this geopolitical flashpoint.",
    badges: ["International Security"],
    tags: ["asia-pacific", "china", "self-rule"],
    metrics: [
      { label: "Leaders", value: "3" },
      { label: "Events", value: "4" },
      { label: "Nuances", value: "6" },
    ],
    updated: "Updated 3 weeks ago",
  }
];

export const discoveryHighlights: DiscoveryHighlight[] = [
  {
    title: "Comprehensive Profiles",
    body: "In-depth biographies, voting records, career arcs, and influence networks for every leader tracked.",
    accent: "from-blue-500 to-indigo-500",
    icon: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 4h10a2 2 0 0 1 2 2v13l-7-3-7 3V6a2 2 0 0 1 2-2Z"
        />
      </svg>
    ),
  },
  {
    title: "Easy Discovery",
    body: "Command palette search, advanced filters, and saved views surface the briefings you need instantly.",
    accent: "from-sky-500 to-cyan-500",
    icon: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-4.35-4.35M16.65 10.83a5.83 5.83 0 1 1-11.66 0 5.83 5.83 0 0 1 11.66 0Z"
        />
      </svg>
    ),
  },
  {
    title: "Diverse Coverage",
    body: "From political blocs to cultural movements and corporate power, Conspectus maps influence across domains.",
    accent: "from-violet-500 to-purple-500",
    icon: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 20a4 4 0 0 1 8 0m-6-9a3 3 0 1 1 6 0m-9 6a4 4 0 0 1 0-8m10 0a4 4 0 0 1 0 8"
        />
      </svg>
    ),
  },
  {
    title: "Quick Insights",
    body: "TL;DR briefings, scenario watchlists, and context cards keep leadership teams aligned under pressure.",
    accent: "from-amber-500 to-orange-500",
    icon: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m13 5-9 9m8-2 3.5 3.5a2.12 2.12 0 0 1 0 3 2.12 2.12 0 0 1-3 0L9 15m10-10-2 2"
        />
      </svg>
    ),
  },
];

export const focusAreas: FocusArea[] = [
  {
    title: "Political Leaders",
    body: "Presidents, prime ministers, and power brokers shaping domestic and foreign policy worldwide.",
    accent: "from-blue-500 to-indigo-500",
  },
  {
    title: "Business Leaders",
    body: "CEOs, founders, and investors steering markets, technology adoption, and corporate governance.",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    title: "Activists & Advocates",
    body: "Movements and organizers driving social change, climate action, and humanitarian response.",
    accent: "from-rose-500 to-pink-500",
  },
  {
    title: "Cultural Shapers",
    body: "Creators and storytellers influencing narratives, public opinion, and global attention.",
    accent: "from-purple-500 to-fuchsia-500",
  },
];

export const profileIncludes = [
  "Comprehensive biography and career timeline",
  "Key positions across pivotal issues and policy areas",
  "Signal feed of events, quotes, and media coverage",
  "TL;DR brief for fast stakeholder alignment",
  "Comparison tools to map allies, rivals, and coalitions",
];