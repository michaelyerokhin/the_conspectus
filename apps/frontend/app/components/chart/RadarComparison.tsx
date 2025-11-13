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
import type { PublicProfile } from "@shared/profile";
import { getFullName, AXIS_NAMES, AXIS_MAPPING } from "@/lib/profileUtils";

interface RadarComparisonProps {
  people: PublicProfile[];
}

export default function RadarComparison({
  people,
}: RadarComparisonProps) {
  const chartData = AXIS_NAMES.map((axis) => {
    const point: Record<string, string | number> = { axis };
    people.forEach((person) => {
      const fullName = getFullName(person);
      const schemaField = AXIS_MAPPING[axis as keyof typeof AXIS_MAPPING];
      point[fullName] = (person[schemaField as keyof PublicProfile] as number) ?? 0;
    });
    return point;
  });

  const colors = ["#2563eb", "#dc2626", "#16a34a", "#9333ea"];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="axis" />
          <PolarRadiusAxis domain={[0, 10]} />
          {people.map((person, i) => {
            const fullName = getFullName(person);
            return (
              <Radar
                key={person.id}
                name={fullName}
                dataKey={fullName}
                stroke={colors[i % colors.length]}
                fill={colors[i % colors.length]}
                fillOpacity={0.4}
              />
            );
          })}
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
      <p className="text-center text-sm text-gray-500 mt-2">
        Scale: 0 to 10
      </p>
    </div>
  );
}
