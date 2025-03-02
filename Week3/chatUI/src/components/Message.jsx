import React from "react";

const Message = ({ text, sender, darkMode }) => {
  const messageStyle = {
    backgroundImage: `url('/Bg.jpg')`, 
    backgroundSize: "cover", 
    backgroundPosition: "center", 
  };

  return (
    <div
      className={`mb-2 ${sender === "user" ? "text-right" : "text-left"}`}
    >
      <div
        style={messageStyle} 
        className={`inline-block p-2 rounded-lg max-w-[70%] ${
          sender === "user"
            ? darkMode
              ? "bg-blue-600 text-white"
              : "bg-blue-500 text-white"
            : darkMode
            ? "bg-gray-600 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default Message;