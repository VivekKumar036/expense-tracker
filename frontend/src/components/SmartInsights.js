function SmartInsights({ expenses = [] }) {
  if (expenses.length < 2) return null;

  const now = new Date();
  const thisMonth = now.getMonth();
  const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;

  let thisMonthTotal = 0;
  let lastMonthTotal = 0;
  const categoryTotals = {};

  expenses.forEach(exp => {
    const d = new Date(exp.createdAt);
    const m = d.getMonth();

    if (m === thisMonth) thisMonthTotal += exp.amount;
    if (m === lastMonth) lastMonthTotal += exp.amount;

    categoryTotals[exp.category] =
      (categoryTotals[exp.category] || 0) + exp.amount;
  });

  const topCategory =
    Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

  const diff = thisMonthTotal - lastMonthTotal;
  const trend =
    diff > 0
      ? `📈 Spending increased by ₹${diff}`
      : diff < 0
      ? `📉 Spending decreased by ₹${Math.abs(diff)}`
      : "➖ Spending unchanged";

  const budgetWarning =
    thisMonthTotal > 8000
      ? "⚠️ You are close to exceeding your monthly budget"
      : "✅ Budget usage is under control";

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow md:col-span-3">
      <h3 className="text-lg font-semibold mb-4">
        Smart Insights
      </h3>

      <ul className="space-y-2 text-sm">
        <li>{trend}</li>
        <li>🍔 Highest spend category: <b>{topCategory}</b></li>
        <li>{budgetWarning}</li>
      </ul>
    </div>
  );
}

export default SmartInsights;
