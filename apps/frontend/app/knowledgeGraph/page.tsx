"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";

export default function KnowledgeGraphPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLoadChart = () => {
    setLoading(true);
    const mock = [
      {
        slug: "sam-altman",
        fullName: "Sam Altman",
        axes: {
          Globalism: 8,
          AIRegulation: 7,
          ClimateAction: 0,
          TechSkepticism: 4,
          CivilLiberties: 0,
          MarketLiberalism: 8,
          SecurityHawk: 3,
          ImmigrationOpenness: 0,
        },
      },
      {
        slug: "jensen-huang",
        fullName: "Jensen Huang",
        axes: {
          Globalism: 6,
          AIRegulation: 5,
          ClimateAction: 0,
          TechSkepticism: 3,
          CivilLiberties: 8,
          MarketLiberalism: 7,
          SecurityHawk: 4,
          ImmigrationOpenness: 0,
        },
      },
    ];

    // Simulate "fetch"
    setTimeout(() => {
      setData(mock);
      setLoading(false);
    }, 800);
  };

  // Define axes order for consistent chart layout
  const axesOrder = [
    "Globalism",
    "AIRegulation",
    "ClimateAction",
    "TechSkepticism",
    "CivilLiberties",
    "MarketLiberalism",
    "SecurityHawk",
    "ImmigrationOpenness",
  ];

  // Transform mock data for Recharts
  const chartData = axesOrder.map((axis) => {
    const point: any = { axis };
    data.forEach((p) => {
      point[p.fullName] = p.axes[axis];
    });
    return point;
  });

  const colors = ["#2563eb", "#dc2626"];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-2">Knowledge Graph</h1>
      <p className="text-gray-600 mb-8">
        Explore leaders through knowledge graph relationships and worldview analysis.
      </p>

      <button
        onClick={handleLoadChart}
        disabled={loading}
        className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-70"
      >
        {loading ? "Loading..." : "Load Radar Chart"}
      </button>

      {data.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-4">
            Political Radar Chart Comparison
          </h2>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="axis" />
                <PolarRadiusAxis domain={[0, 10]} />
                {data.map((person, i) => (
                  <Radar
                    key={person.slug}
                    name={person.fullName}
                    dataKey={person.fullName}
                    stroke={colors[i]}
                    fill={colors[i]}
                    fillOpacity={0.4}
                  />
                ))}
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
            <p className="text-center text-sm text-gray-500 mt-2">
              Scale: 0 (center) to 10 (outer edge)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
