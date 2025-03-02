import React, { useState, useRef, useEffect } from "react";
import { IoChatbox, IoPeople, IoCog, IoMenu } from "react-icons/io5";

const Sidebar = ({ darkMode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to close the sidebar when clicking outside
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  // Add event listener for clicking outside the sidebar
  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <>
      {/* Menu Button (Visible only on small screens) */}
      <button
        onClick={toggleSidebar}
        className={`fixed md:hidden top-4 left-4 p-2 rounded-full ${
          darkMode ? "bg-gray-700" : "bg-gray-200"
        } hover:bg-${darkMode ? "gray-600" : "gray-300"} transition-colors z-20`}
      >
        <IoMenu className={`text-${darkMode ? "white" : "black"}`} />
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed md:relative w-64 h-screen p-4 transform transition-transform duration-300 ${
          darkMode ? "bg-gradient-to-b from-gray-800 to-gray-900" : "bg-gradient-to-b from-white to-gray-100"
        } text-${darkMode ? "white" : "black"} shadow-lg md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        } z-10 pt-16 font-oswald`}
      >
        <h1 className="text-2xl font-bold mb-4">Chats</h1>
        <ul>
          <li
            className={`mb-2 p-2 rounded flex items-center gap-2 cursor-pointer hover:bg-${
              darkMode ? "gray-700" : "gray-200"
            } transition-colors`}
          >
            <IoChatbox /> Krishna
          </li>
          <li
            className={`mb-2 p-2 rounded flex items-center gap-2 cursor-pointer hover:bg-${
              darkMode ? "gray-700" : "gray-200"
            } transition-colors`}
          >
            <IoPeople /> Kanha
          </li>
          <li
            className={`mb-2 p-2 rounded flex items-center gap-2 cursor-pointer hover:bg-${
              darkMode ? "gray-700" : "gray-200"
            } transition-colors`}
          >
            <IoCog /> Settings
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;