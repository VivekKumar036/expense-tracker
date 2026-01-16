import ExpenseForm from "../components/ExpenseForm";

function AddExpense({ expenses = [], onAdd }) {
  return (
    <div className="max-w-md bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        Add New Expense
      </h2>

      <ExpenseForm
        expenses={expenses}
        onSuccess={onAdd}
      />
    </div>
  );
}

export default AddExpense;
