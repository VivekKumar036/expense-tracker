import { Line } from "react-chartjs-2";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function MonthlyChart({ expenses = [] }) {
  // Group expenses by date
  const dataMap = {};

  expenses.forEach(e => {
    const dateObj = new Date(e.createdAt);

    if (isNaN(dateObj)) return;

    const label = dateObj.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short"
    });

    dataMap[label] = (dataMap[label] || 0) + e.amount;
  });

  const data = Object.entries(dataMap).map(([date, amount]) => ({
    date,
    amount
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#2563eb"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default MonthlyChart;
