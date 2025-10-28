import React from "react";
import { motion } from "framer-motion";

const ToggleButton = ({ enabled, onToggle }) => {
  // console.log("ToggleButton - enabled:", enabled);
  // console.log("ToggleButton - onToggle:", onToggle);
  
  
  return (
    <button
      onClick={() => onToggle(!enabled)}
      className="relative flex items-center w-20 h-8 rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-lg"
      title="Toggle Status to enable or disable service"
    >
      <motion.div
        animate={{ backgroundColor: enabled ? "#22c55e" : "#ef4444" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute inset-0"
      />
      <motion.div
        animate={{ x: enabled ? 56 : 4 }}
        transition={{ type: "spring", stiffness: 250, damping: 18 }}
        className="absolute top-1 w-6 h-6 bg-white rounded-md shadow-sm"
      />
      <motion.div
        key={enabled ? "active" : "inactive"}
        initial={{ opacity: 0, x: enabled ? -10 : 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className={`relative flex items-center w-full h-full ${
          enabled ? "justify-start pl-3" : "justify-end pr-3"
        }`}
      >
        <span className="text-white text-xs font-medium">
          {enabled ? "Active" : "Inactive"}
        </span>
      </motion.div>
    </button>
  );
};

export default ToggleButton;