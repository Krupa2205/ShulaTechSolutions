import React, { useState } from "react";
import Message from "./Message";
import { motion } from "framer-motion";
import { IoSend } from "react-icons/io5";

const ChatContainer = ({ darkMode }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello!", sender: "user" },
    { id: 2, text: "Hi there!", sender: "other" },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: inputText, sender: "user" }]);
      setInputText("");
    }
  };

  return (
    <div className={`flex-1 p-4 ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
      <div className="h-[80vh] overflow-y-auto">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Message text={message.text} sender={message.sender} darkMode={darkMode} />
          </motion.div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className={`w-full p-2 rounded border ${darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300"}`}
        />
        <button
          onClick={handleSend}
          className={`p-2 rounded ${darkMode ? "bg-pink-600 hover:bg-pink-700" : "bg-pink-500 hover:bg-pink-600"} text-white`}
        >
          <IoSend />
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;