import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  PlusCircle,
  BarChart,
  Menu
} from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";

function Sidebar() {
  const [open, setOpen] = useState(false);

  const linkBase =
    "flex items-center gap-2 px-4 py-2 rounded transition";

  const inactive =
    "text-gray-700 hover:bg-blue-100 dark:text-gray-300 dark:hover:bg-gray-800";

  const active =
    "bg-blue-600 text-white hover:bg-blue-600";

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white dark:bg-gray-900 p-2 rounded shadow"
        onClick={() => setOpen(!open)}
      >
        <Menu />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-56 bg-white dark:bg-gray-900
          shadow p-4 transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-6">
          Expense Tracker
        </h2>

        <nav className="space-y-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
            onClick={() => setOpen(false)}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/add-expense"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
            onClick={() => setOpen(false)}
          >
            <PlusCircle size={18} />
            Add Expense
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
            onClick={() => setOpen(false)}
          >
            <BarChart size={18} />
            Analytics
          </NavLink>
        </nav>

        {/* Dark mode toggle */}
        <div className="mt-8">
          <DarkModeToggle />
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
