"use client";

import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";

interface PersonData {
  slug: string;
  fullName: string;
  axes: Record<string, number>;
}

interface RadarComparisonProps {
  people: PersonData[];
  axes: string[];
}

export default function RadarComparison({ people, axes }: RadarComparisonProps) {
  // Transform data for Recharts
  const chartData = axes.map((axis) => {
    const point: any = { axis };
    people.forEach((p) => {
      point[p.fullName] = p.axes[axis];
    });
    return point;
  });

  const colors = ["#2563eb", "#dc2626", "#16a34a", "#9333ea"]; // You can add more if needed

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="axis" />
          <PolarRadiusAxis domain={[0, 10]} />
          {people.map((person, i) => (
            <Radar
              key={person.slug}
              name={person.fullName}
              dataKey={person.fullName}
              stroke={colors[i % colors.length]}
              fill={colors[i % colors.length]}
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
  );
}
