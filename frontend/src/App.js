import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import Analytics from "./pages/Analytics";
import api from "./services/api";

function App() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const res = await api.get("/expenses");
      setExpenses(res.data);
    } catch (err) {
      console.error("Failed to fetch expenses", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <BrowserRouter>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="ml-0 md:ml-56 p-6 min-h-screen bg-gray-100 dark:bg-gray-800">
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                expenses={expenses}
                fetchExpenses={fetchExpenses}
              />
            }
          />

          <Route
  path="/add-expense"
  element={
    <AddExpense
      expenses={expenses}
      onAdd={fetchExpenses}
    />
  }
/>

          <Route
            path="/analytics"
            element={<Analytics expenses={expenses} />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
