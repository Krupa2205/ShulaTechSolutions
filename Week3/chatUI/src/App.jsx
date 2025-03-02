import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatContainer from "./components/ChatContainer";
import ThemeToggle from "./components/ThemeToggle";
import { IoChatbubbles } from "react-icons/io5";
import { motion } from "framer-motion";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <motion.div
      className={`flex h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"} font-kanit`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Sidebar darkMode={darkMode} />
      <div className="flex-1 flex flex-col">
        <div className={`p-4 ${darkMode ? "bg-gray-800" : "bg-pink-500"} text-white flex justify-between items-center`}>
          <h1 className="text-2xl font-bold flex items-center gap-2 pl-16 md:pl-4">
            <IoChatbubbles className="text-3xl" /> Chat App
          </h1>
          <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
        </div>
        <ChatContainer darkMode={darkMode} />
      </div>
    </motion.div>
  );
};

export default App;