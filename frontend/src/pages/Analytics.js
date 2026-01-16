import CategoryChart from "../components/CategoryChart";
import TrendChart from "../components/TrendChart";

function Analytics({ expenses = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 🔹 Spending Trend */}
      <div
        className="
          bg-white p-6 rounded-xl shadow
          hover:shadow-xl hover:-translate-y-1
          transition-all duration-300
        "
      >
        <h3 className="text-lg font-semibold mb-4">
          Spending Trend
        </h3>

        <TrendChart expenses={expenses} />
      </div>

      {/* 🔹 Category Breakdown */}
      <div
        className="
          bg-white p-6 rounded-xl shadow
          hover:shadow-xl hover:-translate-y-1
          transition-all duration-300
        "
      >
        <h3 className="text-lg font-semibold mb-4">
          Category Breakdown
        </h3>

        <CategoryChart expenses={expenses} />
      </div>
    </div>
  );
}

export default Analytics;
