import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { DataRow } from "../../utils/loadCSV";

const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"];

interface Props {
  data: DataRow[];
}

function bucketAccountTypes(data: DataRow[]) {
  const counts: Record<string, number> = {};
  data.forEach((row) => {
    const type = row["Account Type"] || "Unknown";
    counts[type] = (counts[type] || 0) + 1;
  });
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

export function AccountTypeDonut({ data }: Props) {
  const chartData = bucketAccountTypes(data);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={chartData} dataKey="value" cx="50%" cy="50%" innerRadius={60} outerRadius={100} label>
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
