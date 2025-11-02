import { useRouter } from 'next/navigation';
import React, { useState } from "react";

export default function KnowledgeGraph() {
  const [input, setInput] = useState("Jensen Huang, Sam Altman");

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Knowledge Graph</h1>
      <p className="text-slate-500 mb-6">
        Explore leaders through knowledge graph relationships and worldview analysis.
      </p>

      <div className="flex gap-3 mb-4">
        <button className="rounded-md bg-slate-200 px-4 py-2 font-medium">Graph</button>
        <button className="rounded-md bg-slate-100 px-4 py-2 font-medium text-slate-500">Structured Search</button>
        <button className="rounded-md bg-slate-100 px-4 py-2 font-medium text-slate-500">Knowledge Graph Search</button>
        <button className="rounded-md bg-slate-100 px-4 py-2 font-medium text-slate-500">Situation Room</button>
      </div>

      <input
        className="w-full border rounded-md p-3 mb-3"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <p className="text-slate-500 mb-4">
        <span className="font-semibold">Log in</span> to add yourself to the chart
      </p>
      <button className="w-full bg-slate-800 text-white rounded-md py-3 font-semibold">
        Load Radar Chart
      </button>
    </div>
  );
}
