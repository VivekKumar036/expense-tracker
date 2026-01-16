import { useState } from "react";
import api from "../services/api";
import EditExpenseModal from "./EditExpenseModal";
import ExpenseFilters from "./ExpenseFilters";
import { exportToCSV } from "../utils/exportCSV";

function RecentExpenses({ expenses = [], onDelete, onUpdate }) {
  const [editingExpense, setEditingExpense] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // 🔍 Filter logic
  const filteredExpenses = expenses.filter(exp => {
    const matchesTitle = exp.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category
      ? exp.category === category
      : true;

    return matchesTitle && matchesCategory;
  });

  const resetFilters = () => {
    setSearch("");
    setCategory("");
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      if (onDelete) onDelete();
    } catch {
      alert("Failed to delete expense");
    }
  };

if (!expenses.length) {
  return (
    <div className="bg-white p-6 rounded-lg shadow text-center">
      <p className="text-gray-500 italic">
        No expenses yet 📭
      </p>
      <p className="text-sm text-gray-400 mt-1">
        Start tracking your spending today
      </p>
    </div>
  );
}

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">
        Recent Expenses
      </h3>

      {/* 🔎 Filters */}
      <ExpenseFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        onReset={resetFilters}
      />

      {/* 📤 Export CSV */}
      <button
        onClick={() =>
          exportToCSV(
            "expenses.csv",
            filteredExpenses.map(e => ({
              Title: e.title,
              Amount: e.amount,
              Category: e.category,
              Date: new Date(e.createdAt).toLocaleDateString()
            }))
          )
        }
        className="mb-4 px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
      >
        Export CSV
      </button>

      <ul className="space-y-3">
        {filteredExpenses.slice(0, 5).map(exp => (
          <li
            key={exp._id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="font-medium">{exp.title}</p>
              <p className="text-sm text-gray-500">
                {exp.category}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-semibold">
                ₹ {exp.amount}
              </span>

              <button
                onClick={() => setEditingExpense(exp)}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(exp._id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* ✏️ Edit Modal */}
      {editingExpense && (
        <EditExpenseModal
          expense={editingExpense}
          onClose={() => setEditingExpense(null)}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
}

export default RecentExpenses;
