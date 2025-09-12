import React, { useState } from "react";

const StatusToggle = ({ initialStatus = "Active" }) => {
  const [status, setStatus] = useState(initialStatus);

  const toggleStatus = () => {
    setStatus((prev) => (prev === "Active" ? "Inactive" : "Active"));
  };

  return (
    <button
      onClick={toggleStatus}
      className="relative flex items-center w-32 h-10 rounded-lg overflow-hidden cursor-pointer shadow-md transition-all duration-300 hover:shadow-lg"
    >
      {/* Background */}
      <div className={`absolute inset-0 transition-colors duration-300 ${
        status === "Active" ? "bg-green-500" : "bg-red-500"
      }`}></div>
      
      {/* White slider with smooth animation */}
      <div className={`absolute top-1 w-8 h-8 bg-white rounded-md shadow-sm transition-all duration-300 ease-in-out ${
        status === "Active" ? "right-1" : "left-1"
      }`}></div>
      
      {/* Text */}
      <div className={`relative flex items-center w-full h-full transition-all duration-300 ${
        status === "Active" ? "justify-start pl-3" : "justify-end pr-3"
      }`}>
        <span className="text-white text-sm font-medium">{status}</span>
      </div>
    </button>
  );
};

export default StatusToggle;