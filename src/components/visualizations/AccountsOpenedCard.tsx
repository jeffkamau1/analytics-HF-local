import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import type { DataRow } from "../../utils/loadCSV";

interface Props {
  data: DataRow[];
}

function bucketAccountsByYear(data: DataRow[]) {
  const counts: Record<number, number> = {};

  data.forEach((row) => {
    const d = new Date(row["Date Of Account Opening"]);
    if (isNaN(d.getTime())) return;

    const year = d.getFullYear();

    // Only include accounts opened from 2013–2018
    if (year >= 2005 && year <= 2018) {
      counts[year] = (counts[year] || 0) + 1;
    }
  });

  // Convert to array and sort by year
  return Object.entries(counts)
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => Number(a.year) - Number(b.year));
}

export function AccountsOpenedChart({ data }: Props) {
  const chartData = bucketAccountsByYear(data);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
// import type { DataRow } from "../../utils/loadCSV";

// interface Props {
//   data: DataRow[];
// }

// function bucketAccounts(data: DataRow[]) {
//   const counts: Record<string, number> = {};

//   data.forEach((row) => {
//     const d = new Date(row["Date Of Account Opening"]);
//     if (isNaN(d.getTime())) return;

//     const year = d.getFullYear();

//     // Format YYYY-MM
//      if (year >= 2013 && year <= 2018) {
//       const key = `${year}-${String(d.getMonth() + 1).padStart(2, "0")}`;
//       counts[key] = (counts[key] || 0) + 1;
//     }
//   });

//     return Object.entries(counts)
//     .map(([month, count]) => ({ month, count }))
//     .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
// }

// export function AccountsOpenedChart({ data }: Props) {
//   const chartData = bucketAccounts(data);

//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <BarChart data={chartData}>
//         <XAxis dataKey="month" />
//         <YAxis />
//         <Tooltip />
//         <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }

// import type { DataRow } from "../../utils/loadCSV";
// import { Card } from "flowbite-react";

// interface Props {
//   data: DataRow[];
// }

// export function AccountsOpenedCard({ data }: Props) {
//   const now = new Date();
//   const sixMonthsAgo = new Date();
//   sixMonthsAgo.setMonth(now.getMonth() - 6);

//   const count = data.filter((row) => {
//     const opened = new Date(row["Date Of Account Opening"]);
//     return !isNaN(opened.getTime()) && opened >= sixMonthsAgo;
//   }).length;

//   return (
//     <div>
//       <h2 className="text-lg font-semibold">Accounts Opened (6 Months)</h2>
//       <p className="text-3xl font-bold">{count}</p>
//     </div>
//     // <Card className="max-w-sm">
//     //   <h2 className="text-lg font-semibold">Accounts Opened (6 Months)</h2>
//     //   <p className="font-normal text-gray-700 dark:text-gray-400">
//     //     {count}
//     //   </p>
//     // </Card>
//   );
// }
