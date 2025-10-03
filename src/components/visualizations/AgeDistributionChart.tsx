import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { DataRow } from "../../utils/loadCSV";

interface Props {
  data: DataRow[];
}

function bucketAges(data: DataRow[]) {
  const buckets: Record<string, number> = {
    "18-25": 0,
    "26-35": 0,
    "36-45": 0,
    "46-60": 0,
    "60+": 0,
  };

  data.forEach((row) => {
    const age = parseInt(row.Age);
    if (isNaN(age)) return;
    if (age <= 25) buckets["18-25"]++;
    else if (age <= 35) buckets["26-35"]++;
    else if (age <= 45) buckets["36-45"]++;
    else if (age <= 60) buckets["46-60"]++;
    else buckets["60+"]++;
  });

  return Object.entries(buckets).map(([range, count]) => ({ range, count }));
}

export function AgeDistributionChart({ data }: Props) {
  const chartData = bucketAges(data);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#4F46E5" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
