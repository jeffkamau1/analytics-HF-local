import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { DataRow } from "../../utils/loadCSV";

const COLORS = ["#3B82F6", "#EC4899", "#10B981"];

interface Props {
  data: DataRow[];
}

// function bucketGender(data: DataRow[]) {
//   const counts: Record<string, number> = {};
//   data.forEach((row) => {
//     const g = row.Gender?.toLowerCase();
//     if (g.includes("male")) counts["Male"] = (counts["Male"] || 0) + 1;
//     else if (g.includes("female")) counts["Female"] = (counts["Female"] || 0) + 1;
//     else counts["Other"] = (counts["Other"] || 0) + 1;
//   });
//   return Object.entries(counts).map(([name, value]) => ({ name, value }));
// }

function bucketGender(data: DataRow[]) {
  const counts: Record<string, number> = { Male: 0, Female: 0, Other: 0 };

  data.forEach((row) => {
    const g = row.Gender?.trim().toLowerCase();
    if (g === "male" || g === "m") counts.Male++;
    else if (g === "female" || g === "f") counts.Female++;
    else counts.Other++;
  });

  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}


export function GenderDonut({ data }: Props) {
  const chartData = bucketGender(data);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={chartData} dataKey="value" cx="50%" cy="50%" outerRadius={100} label>
          {chartData.map((_, idx) => (
            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
