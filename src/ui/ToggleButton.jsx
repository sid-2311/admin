import React, { useState } from "react";
import { motion } from "framer-motion";

const StatusToggle = ({ initialStatus = "Active" }) => {
  const [status, setStatus] = useState(initialStatus);

  const toggleStatus = () => {
    setStatus((prev) => (prev === "Active" ? "Inactive" : "Active"));
  };

  return (
    <button
      onClick={toggleStatus}
      className="relative flex items-center w-32 h-10 rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-lg"
    >
      {/* Background with smooth fade */}
      <motion.div
        animate={{ backgroundColor: status === "Active" ? "#22c55e" : "#ef4444" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute inset-0"
      />

      {/* White slider with spring bounce effect */}
      <motion.div
        animate={{
          x: status === "Active" ? 84 : 4, // move left ↔ right
        }}
        transition={{
          type: "spring",
          stiffness: 250, // spring tightness
          damping: 18, // bounce control
        }}
        className="absolute top-1 w-8 h-8 bg-white rounded-md shadow-sm"
      />

      {/* Text with smooth fade/slide */}
      <motion.div
        key={status} // re-render on status change
        initial={{ opacity: 0, x: status === "Active" ? -10 : 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className={`relative flex items-center w-full h-full ${
          status === "Active" ? "justify-start pl-3" : "justify-end pr-3"
        }`}
      >
        <span className="text-white text-sm font-medium">{status}</span>
      </motion.div>
    </button>
  );
};

export default StatusToggle;
