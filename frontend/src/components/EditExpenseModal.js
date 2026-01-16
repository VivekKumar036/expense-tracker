import { useState } from "react";
import api from "../services/api";

function EditExpenseModal({ expense, onClose, onUpdate }) {
  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount);
  const [category, setCategory] = useState(expense.category);

  const handleUpdate = async () => {
    try {
      await api.put(`/expenses/${expense._id}`, {
        title,
        amount: Number(amount),
        category
      });

      onUpdate();
      onClose();
    } catch {
      alert("Failed to update expense");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80">
        <h3 className="text-lg font-semibold mb-4">
          Edit Expense
        </h3>

        <input
          className="w-full border p-2 mb-3 rounded"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3 rounded"
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />

        <select
          className="w-full border p-2 mb-4 rounded"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Other</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-3 py-1 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditExpenseModal;
