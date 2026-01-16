function AdvancedInsights({ expenses = [] }) {
  if (expenses.length < 3) return null;

  const now = new Date();
  const currentMonth = now.getMonth();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;

  let current = 0;
  let previous = 0;

  expenses.forEach(e => {
    const m = new Date(e.date).getMonth();

    if (m === currentMonth) current += e.amount;
    if (m === lastMonth) previous += e.amount;
  });

  const trend =
    previous === 0
      ? "Not enough data to compare months"
      : current > previous
      ? `📈 You’re spending ${Math.round(
          ((current - previous) / previous) * 100
        )}% more than last month`
      : `📉 You’re spending less than last month`;

  const avgDaily = Math.round(current / new Date().getDate());
  const projected = avgDaily * 30;

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow md:col-span-3">
      <h3 className="text-lg font-semibold mb-3">
        Advanced Insights
      </h3>

      <ul className="space-y-2 text-sm">
        <li>{trend}</li>
        <li>📊 Avg daily spend: ₹ {avgDaily}</li>
        <li>🔮 Projected monthly spend: ₹ {projected}</li>
      </ul>
    </div>
  );
}

export default AdvancedInsights;
