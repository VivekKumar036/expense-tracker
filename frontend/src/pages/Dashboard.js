import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import CategoryChart from "../components/CategoryChart";
import RecentExpenses from "../components/RecentExpenses";
import SmartInsights from "../components/SmartInsights";
import AdvancedInsights from "../components/AdvancedInsights";

function Dashboard({ expenses = [], fetchExpenses }) {
  /* ---------------- TOTAL ---------------- */
  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  /* ---------------- BUDGET ---------------- */
  const [budget, setBudget] = useState(10000);
  const [editing, setEditing] = useState(false);
  const [tempBudget, setTempBudget] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("monthlyBudget");
    if (saved) setBudget(Number(saved));
  }, []);

  const saveBudget = () => {
    if (!tempBudget || tempBudget <= 0) return;
    localStorage.setItem("monthlyBudget", tempBudget);
    setBudget(Number(tempBudget));
    setEditing(false);
  };

  /* ---------------- ANALYTICS ---------------- */
  const months = new Set(
    expenses.map(e => new Date(e.date).getMonth())
  );

  const monthlyAvg = months.size
    ? Math.round(total / months.size)
    : 0;

  const categoryTotals = {};
  expenses.forEach(e => {
    categoryTotals[e.category] =
      (categoryTotals[e.category] || 0) + e.amount;
  });

  const topCategory =
    Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {/* ================= KPI CARDS ================= */}
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
        <p className="text-gray-500 text-sm">Total Spent</p>
        <motion.h2
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-bold mt-2"
        >
          ₹ {total}
        </motion.h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
        <p className="text-gray-500 text-sm">Monthly Average</p>
        <motion.h2
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-bold mt-2"
        >
          ₹ {monthlyAvg}
        </motion.h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
        <p className="text-gray-500 text-sm">Top Category</p>
        <motion.h2
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-bold mt-2"
        >
          {topCategory}
        </motion.h2>
      </div>

      {/* ================= INSIGHTS ================= */}
      <SmartInsights expenses={expenses} />
      <AdvancedInsights expenses={expenses} />

      {/* ================= CATEGORY CHART ================= */}
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition md:col-span-2">
        <h3 className="text-lg font-semibold mb-4">
          Category Breakdown
        </h3>
        <CategoryChart expenses={expenses} />
      </div>

      {/* ================= BUDGET ================= */}
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition md:col-span-3">
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-sm">Monthly Budget</p>

          {!editing ? (
            <button
              onClick={() => {
                setTempBudget(budget);
                setEditing(true);
              }}
              className="text-blue-600 text-sm hover:underline"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={saveBudget}
              className="text-green-600 text-sm hover:underline"
            >
              Save
            </button>
          )}
        </div>

        {editing && (
          <input
            type="number"
            value={tempBudget}
            onChange={e => setTempBudget(e.target.value)}
            className="border p-2 rounded w-40 mt-2"
          />
        )}

        <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
          <div
            className={`h-4 rounded-full ${
              total < budget * 0.8
                ? "bg-green-500"
                : total < budget
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{
              width: `${Math.min((total / budget) * 100, 100)}%`
            }}
          />
        </div>

        <p className="mt-2 font-semibold">
          ₹ {total} / ₹ {budget}
        </p>

        {total > budget && (
          <p className="text-red-600 mt-2 font-semibold">
            ⚠️ Budget exceeded!
          </p>
        )}
      </div>

      {/* ================= RECENT EXPENSES ================= */}
      <div className="md:col-span-3">
        <RecentExpenses
          expenses={expenses}
          onDelete={fetchExpenses}
          onUpdate={fetchExpenses}
        />
      </div>
    </motion.div>
  );
}

export default Dashboard;
