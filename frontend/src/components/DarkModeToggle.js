import { useEffect, useState } from "react";

function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-3 py-1 rounded border dark:bg-gray-800 dark:text-white"
    >
      {dark ? "☀ Light" : "🌙 Dark"}
    </button>
  );
}

export default DarkModeToggle;
