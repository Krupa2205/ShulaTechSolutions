import React from "react";
import { IoMoon, IoSunny } from "react-icons/io5";

const ThemeToggle = ({ darkMode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"} hover:bg-${darkMode ? "gray-600" : "gray-300"} transition-colors`}
    >
      {darkMode ? <IoSunny className="text-yellow-400" /> : <IoMoon className="text-gray-800" />}
    </button>
  );
};

export default ThemeToggle;