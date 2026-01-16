import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function TrendChart({ expenses = [] }) {
  const dataMap = {};

  expenses.forEach(e => {
    const date = new Date(e.createdAt).toLocaleDateString();
    dataMap[date] = (dataMap[date] || 0) + e.amount;
  });

  const data = Object.keys(dataMap).map(d => ({
    date: d,
    amount: dataMap[d]
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
      <h3 className="text-lg font-semibold mb-4">
        Spending Trend
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#2563eb"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TrendChart;
