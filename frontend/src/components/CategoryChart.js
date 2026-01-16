import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryChart({ expenses = [] }) {
  const categoryTotals = {};

  expenses.forEach(exp => {
    categoryTotals[exp.category] =
      (categoryTotals[exp.category] || 0) + exp.amount;
  });

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#3b82f6",
          "#22c55e",
          "#f97316",
          "#ef4444",
          "#a855f7"
        ]
      }
    ]
  };

  return <Pie data={data} />;
}

export default CategoryChart;
