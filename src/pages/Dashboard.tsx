import { useEffect, useState } from "react";
import { loadCSV} from "../utils/loadCSV";
import type {DataRow} from "../utils/loadCSV"
import { AccountsOpenedChart } from "../components/visualizations/AccountsOpenedCard";
import { GenderDonut } from "../components/visualizations/GenderDonut";
import { AgeDistributionChart } from "../components/visualizations/AgeDistributionChart";
import { AccountTypeDonut } from "../components/visualizations/AccountTypeDonut";
import { Card } from "flowbite-react";

export default function Dashboard() {
  const [data, setData] = useState<DataRow[]>([]);

  useEffect(() => {
    loadCSV("/data/Comprehensive_Banking_Database.csv").then(setData);
  }, []);

  if (!data.length) return <p className="p-4">Loading data...</p>;

  return (
    <div className="p-6">
      {/* Dashboard Heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        HFC Analytics Dashboard
      </h1>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold mb-2">Accounts Opened Over Time</h2>
          <AccountsOpenedChart data={data} />
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-2">Gender Distribution</h2>
          <GenderDonut data={data} />
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-2">Age Distribution</h2>
          <AgeDistributionChart data={data} />
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-2">Account Types</h2>
          <AccountTypeDonut data={data} />
        </Card>
      </div>
    </div>
  );
}
// import { Card } from "flowbite-react";
// import { AccountsOpenedChart } from "../components/visualizations/AccountsOpenedCard";
// import { GenderDonut } from "../components/visualizations/GenderDonut";
// import { AgeDistributionChart } from "../components/visualizations/AgeDistributionChart";
// import { AccountTypeDonut } from "../components/visualizations/AccountTypeDonut";
// import { useEffect, useState } from "react";
// import { loadCSV} from "../utils/loadCSV";
// import type { DataRow } from "../utils/loadCSV";

// export default function Dashboard() {
//   const [data, setData] = useState<DataRow[]>([]);

//   useEffect(() => {
//     loadCSV("/data/Comprehensive_Banking_Database.csv").then(setData);
//   }, []);

//   if (!data.length) return <p className="p-4">Loading data...</p>;

//   return (
//     <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
//       <Card>
//         <h2 className="text-lg font-semibold mb-2">Accounts Opened Over Time</h2>
//         <AccountsOpenedChart data={data} />
//       </Card>

//       <Card>
//         <h2 className="text-lg font-semibold mb-2">Gender Distribution</h2>
//         <GenderDonut data={data} />
//       </Card>

//       <Card>
//         <h2 className="text-lg font-semibold mb-2">Age Distribution</h2>
//         <AgeDistributionChart data={data} />
//       </Card>

//       <Card>
//         <h2 className="text-lg font-semibold mb-2">Account Types</h2>
//         <AccountTypeDonut data={data} />
//       </Card>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { loadCSV } from "../utils/loadCSV";
// import type { DataRow } from "../utils/loadCSV";
// import { AccountsOpenedChart } from "../components/visualizations/AccountsOpenedCard";
// import { GenderDonut } from "../components/visualizations/GenderDonut";
// import { AgeDistributionChart } from "../components/visualizations/AgeDistributionChart";
// import { AccountTypeDonut } from "../components/visualizations/AccountTypeDonut";
// import { Card } from "flowbite-react";

// export default function Dashboard() {
//   const [data, setData] = useState<DataRow[]>([]);

//   useEffect(() => {
//     loadCSV("/data/Comprehensive_Banking_Database.csv").then(setData);
//   }, []);

//   if (!data.length) return <p className="p-4">Loading data...</p>;

//   return (
//     <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//       {/* KPI Card */}
//       <AccountsOpenedChart data={data} />

//       {/* Gender Donut */}
//       <Card>
//         <h2 className="text-lg font-semibold mb-2">Gender Distribution</h2>
//         <GenderDonut data={data} />
//       </Card>

//       {/* Age Distribution */}
//       <Card>
//         <h2 className="text-lg font-semibold mb-2">Age Distribution</h2>
//         <AgeDistributionChart data={data} />
//       </Card>

//       {/* Account Types */}
//       <Card>
//         <h2 className="text-lg font-semibold mb-2">Account Types</h2>
//         <AccountTypeDonut data={data} />
//       </Card>
//     </div>
//   );
// }
