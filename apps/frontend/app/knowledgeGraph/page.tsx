"use client";

import { useState } from "react";
import Select from "react-select";
import RadarComparison from "../components/chart/RadarComparison";
import Link from "next/link";
import { mockPeopleData } from "../components/data"; 

export default function KnowledgeGraphPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState<any[]>([]);

  const allPeople = mockPeopleData.map((p) => ({
    value: p.slug,
    label: p.fullName,
  }));

  const handleLoadChart = async () => {
    if (selectedPeople.length === 0) return;
    setLoading(true);

    // Simulate fetching from an API or database
    const mockFetch = new Promise((resolve) => {
      setTimeout(() => {
        const filtered = mockPeopleData.filter((p) =>
          selectedPeople.some((sel) => sel.value === p.slug)
        );
        resolve(filtered);
      }, 800);
    });

    const result: any = await mockFetch;
    setData(result);
    setLoading(false);
  };
  const axes = [
    "Globalism",
    "AIRegulation",
    "ClimateAction",
    "TechSkepticism",
    "CivilLiberties",
    "MarketLiberalism",
    "SecurityHawk",
    "ImmigrationOpenness",
  ];

  return (
    <div className="min-h-screen bg-[#f6f8fc] p-8">
      <h1 className="text-3xl font-bold mb-2 text-black">Knowledge Graph</h1>
      <p className="text-slate-600 mb-8">
        Explore leaders through knowledge graph relationships and worldview analysis.
      </p>

      {/* Tabs Section */}
      <div className="flex gap-4 mb-6 border-b border-slate-200">
        {["Graph", "Structured Search", "Knowledge Graph Search", "Situation Room"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium rounded-t-md ${
              tab === "Graph"
                ? "bg-white text-slate-900 border border-slate-200 border-b-transparent"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <Select
        isMulti
        options={allPeople}
        placeholder="Search and select leaders to compare..."
        className="mb-4"
        value={selectedPeople}
        onChange={(selected) => setSelectedPeople([...(selected || [])])}
      />
      <Link href="/login">
        <button className="flex items-center justify-center gap-2 text-black bg-white font-medium hover:bg-[#3c74f6] transition w-full px-4 py-2 border border-slate-200 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-slate-300 hover:text-white">
          <span>Log in to add yourself</span>
        </button>
      </Link>

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

      {/* Chart Section */}
      {data.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-1">Worldview Comparison</h2>
          <p className="text-slate-600 mb-6">
            The Knowledge Graph visualizes leaders' worldviews across major global dimensions
            like technology, markets, and governance.
          </p>
          <RadarComparison people={data} axes={axes} />
        </div>
      )}
    </div>
  );
}
