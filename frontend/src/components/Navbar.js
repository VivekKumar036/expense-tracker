import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();

  const linkStyle = (path) =>
    `px-3 py-2 rounded ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-blue-600 hover:bg-blue-100"
    }`;

  return (
    <nav className="flex gap-3 bg-white p-4 rounded-lg shadow mb-6">
      <Link to="/" className={linkStyle("/")}>Dashboard</Link>
      <Link to="/add-expense" className={linkStyle("/add-expense")}>Add Expense</Link>
      <Link to="/analytics" className={linkStyle("/analytics")}>Analytics</Link>
    </nav>
  );
}

export default Navbar;
