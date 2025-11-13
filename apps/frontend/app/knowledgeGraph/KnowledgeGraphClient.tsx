"use client";

import { useState } from "react";
import Link from "next/link";
import RadarComparison from "@/components/chart/RadarComparison";
import { mockPeopleData } from "@/components/data";
import type { PublicProfile } from "@shared/profile";
import type { CurrentUser } from "@/lib/types";
import { getFullName } from "@/lib/profileUtils";
import Select, { type MultiValue } from "react-select";

type SelectOption = {
  value: string;
  label: string;
};

interface KnowledgeGraphClientProps {
  currentUser: CurrentUser | null;
}

export default function KnowledgeGraphClient({
  currentUser,
}: KnowledgeGraphClientProps) {
  const [data, setData] = useState<PublicProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState<MultiValue<SelectOption>>([]);

  const allPeople = mockPeopleData.map((p) => ({
    value: p.id,
    label: getFullName(p),
  }));

  const handleLoadChart = async () => {
    if (selectedPeople.length === 0) return;
    setLoading(true);

    const mockFetch = new Promise<PublicProfile[]>((resolve) => {
      setTimeout(() => {
        const selectedIds = selectedPeople.map((option) => option.value);
        const filtered = mockPeopleData.filter((p) =>
          selectedIds.includes(p.id)
        );
        resolve(filtered);
      }, 800);
    });

    const result = await mockFetch;
    setData(result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f6f8fc] p-8">
      <h1 className="text-3xl font-bold mb-2 text-black">Knowledge Graph</h1>
      <p className="text-slate-600 mb-8">
        Explore leaders through knowledge graph relationships and worldview analysis.
      </p>
      <Select
        isMulti
        options={allPeople}
        placeholder="Search and select leaders to compare..."
        className="mb-4 text-black"
        value={selectedPeople}
        onChange={(selected) => setSelectedPeople((selected as MultiValue<SelectOption>) || [])}
      />
      {!currentUser ? (
        <Link href="/login">
          <button className="flex items-center justify-center gap-2 text-black bg-white font-medium hover:bg-[#3c74f6] transition w-full px-4 py-2 border border-slate-200 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-slate-300 hover:text-white">
            <span>Log in to add yourself</span>
          </button>
        </Link>
      ) : (
        <button
          onClick={handleLoadChart}
          disabled={loading}
          className="w-full py-3 bg-[#1e2631] text-white font-medium rounded-md hover:bg-[#111827] transition"
        >
          {loading
            ? "Loading..."
            : selectedPeople.length > 0
            ? `Load Radar Chart (${selectedPeople.length} ${
                selectedPeople.length === 1 ? "figure" : "figures"
              })`
            : "Load Radar Chart"}
        </button>
      )}

      {/* Chart Section */}
      {data.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-1 text-black">Worldview Comparison</h2>
          <p className="text-slate-600 mb-6">
            The Knowledge Graph visualizes leaders&apos; worldviews across major global dimensions
            like technology, markets, and governance.
          </p>
          <RadarComparison people={data} />
        </div>
      )}
    </div>
  );
}

