import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchTotal();
  }, []);

  const fetchTotal = async () => {
    try {
      const res = await api.get("/expenses");
      const sum = res.data.reduce((acc, item) => acc + item.amount, 0);
      setTotal(sum);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Total Spent</h2>
      <p className="text-3xl font-bold text-blue-600">₹ {total}</p>
    </div>
  );
}

export default Dashboard;
