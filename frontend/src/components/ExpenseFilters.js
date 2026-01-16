function ExpenseFilters({
  search,
  setSearch,
  category,
  setCategory,
  onReset
}) {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-4">
      <input
        className="border p-2 rounded w-full md:w-1/2"
        placeholder="Search by title..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <select
        className="border p-2 rounded w-full md:w-1/4"
        value={category}
        onChange={e => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option>Food</option>
        <option>Travel</option>
        <option>Shopping</option>
        <option>Bills</option>
        <option>Other</option>
      </select>

      <button
        onClick={onReset}
        className="border p-2 rounded bg-gray-100 hover:bg-gray-200"
      >
        Reset
      </button>
    </div>
  );
}

export default ExpenseFilters;
