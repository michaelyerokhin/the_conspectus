"use client";

import { useState } from "react";
import RadarComparison from "../components/chart/RadarComparison"; 
import Link from "next/link";

export default function KnowledgeGraphPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [names, setNames] = useState("Jensen Huang, Sam Altman");

  const handleLoadChart = () => {
    setLoading(true);
    const mock = [
      {
        slug: "sam-altman",
        fullName: "Sam Altman",
        axes: {
          Globalism: 8,
          AIRegulation: 7,
          ClimateAction: 5,
          TechSkepticism: 4,
          CivilLiberties: 6,
          MarketLiberalism: 8,
          SecurityHawk: 3,
          ImmigrationOpenness: 9,
        },
      },
      {
        slug: "jensen-huang",
        fullName: "Jensen Huang",
        axes: {
          Globalism: 6,
          AIRegulation: 5,
          ClimateAction: 7,
          TechSkepticism: 3,
          CivilLiberties: 8,
          MarketLiberalism: 7,
          SecurityHawk: 4,
          ImmigrationOpenness: 7,
        },
      },
    ];

    // Simulate fetch delay
    setTimeout(() => {
      setData(mock);
      setLoading(false);
    }, 800);
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
      <h1 className="text-3xl font-bold mb-2">Knowledge Graph</h1>
      <p className="text-slate-600 mb-8">
        Explore leaders through knowledge graph relationships and worldview analysis.
      </p>

      <div className="flex gap-4 mb-6 border-b border-slate-200">
        {["Graph", "Structured Search", "Knowledge Graph Search", "Situation Room"].map(
          (tab) => (
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
          )
        )}
      </div>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Enter multiple names (e.g., Jensen Huang, Sam Altman)"
        value={names}
        onChange={(e) => setNames(e.target.value)}
        className="w-full px-4 py-2 border border-slate-200 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-slate-300"
      />
      
      
      <Link href = "/login"> 
      <button className=" bg-white font-medium hover:bg-[#3c74f6] transition w-full px-4 py-2 border border-slate-200 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-slate-300 hover:text-white"
      >  
      <p> Log in to add yourself </p>
      </button>
      </Link> 
      
      <button
        onClick={handleLoadChart}
        disabled={loading}
        className="w-full py-3 bg-[#1e2631] text-white font-medium rounded-md hover:bg-[#111827] transition"
      >
        {loading ? "Loading..." : "Load Radar Chart"}
      </button>

      {/* Chart Section */}
      {data.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-4">
            Political Radar Chart Comparison
          </h2>
          <RadarComparison people={data} axes={axes} />
        </div>
      )}
    </div>
  );
}
