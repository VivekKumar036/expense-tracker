import api from "../services/api";
import { useState } from "react";

function ExpenseForm({ expenses = [], budget = 10000, onSuccess }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [loading, setLoading] = useState(false);

  const projectedTotal =
    Number(amount || 0) +
    expenses.reduce((sum, e) => sum + e.amount, 0);

  const addExpense = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    if (!amount || amount <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    try {
      setLoading(true);

      await api.post("/expenses", {
        title: title.trim(),
        amount: Number(amount),
        category
      });

      setTitle("");
      setAmount("");
      setCategory("Food");

      if (onSuccess) onSuccess();
      alert("Expense added successfully ✅");
    } catch (error) {
      console.error("Add expense failed:", error);
      alert("Failed to add expense ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md p-6 bg-white rounded-xl shadow hover:shadow-xl transition mt-6">
      <h3 className="text-xl font-semibold mb-4">
        Add Expense
      </h3>

      <input
        className="w-full border p-2 rounded mb-3"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded mb-3"
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />

      {/* 🔮 Smart Preview */}
      {amount && (
        <div className="bg-blue-50 p-3 rounded text-sm text-blue-700 mb-3">
          After adding this expense:
          <ul className="mt-1 list-disc ml-4">
            <li>Total spending → ₹ {projectedTotal}</li>
            <li>
              {projectedTotal > budget
                ? "⚠️ This exceeds your monthly budget"
                : "✅ Still within budget"}
            </li>
          </ul>
        </div>
      )}

      <select
        className="w-full border p-2 rounded mb-4"
        value={category}
        onChange={e => setCategory(e.target.value)}
      >
        <option>Food</option>
        <option>Travel</option>
        <option>Shopping</option>
        <option>Bills</option>
        <option>Other</option>
      </select>

      <button
        onClick={addExpense}
        disabled={loading}
        className={`
          w-full py-2 text-white rounded
          bg-blue-600 hover:bg-blue-700
          active:scale-95 transition-transform
          ${loading ? "opacity-60 cursor-not-allowed" : ""}
        `}
      >
        {loading ? "Adding..." : "Add Expense"}
      </button>
    </div>
  );
}

export default ExpenseForm;
