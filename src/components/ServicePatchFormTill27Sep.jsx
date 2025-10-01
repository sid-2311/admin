
import React, { useState } from "react";
import { patchServiceBySlug } from "../api/api";

// Utility: flatten all nested fields to paths like 'cardData.cards[0].title'
function flattenFields(obj, prefix = "") {
  let fields = [];
  if (Array.isArray(obj)) {
    obj.forEach((item, idx) => {
      const arrPrefix = prefix ? `${prefix}[${idx}]` : `[${idx}]`;
      if (typeof item === "object" && item !== null) {
        fields = fields.concat(flattenFields(item, arrPrefix));
      } else {
        // Primitive value in array (string, number, boolean)
        fields.push(arrPrefix);
      }
    });
  } else if (typeof obj === "object" && obj !== null) {
    Object.entries(obj).forEach(([key, value]) => {
      const newPrefix = prefix ? `${prefix}.${key}` : key;
      if (Array.isArray(value)) {
        // Array: handle each item
        fields = fields.concat(flattenFields(value, newPrefix));
      } else if (typeof value === "object" && value !== null) {
        fields = fields.concat(flattenFields(value, newPrefix));
      } else {
        fields.push(newPrefix);
      }
    });
  }
  return fields;
}


// Utility: get value by path like 'cardData.cards[0].title'
function getValueByPath(obj, path) {
  if (!path) return "";
  const parts = path.replace(/\[(\d+)\]/g, ".$1").split(".");
  let val = obj;
  for (let p of parts) {
    if (val == null) return "";
    val = val[p];
  }
  return val;
}

// Utility: set value by path (deep clone)
function setValueByPath(obj, path, value) {
  const parts = path.replace(/\[(\d+)\]/g, ".$1").split(".");
  const clone = JSON.parse(JSON.stringify(obj));
  let curr = clone;
  for (let i = 0; i < parts.length - 1; i++) {
    if (curr[parts[i]] == null) {
      // If next is number, create array, else object
      curr[parts[i]] = isNaN(Number(parts[i + 1])) ? {} : [];
    }
    curr = curr[parts[i]];
  }
  curr[parts[parts.length - 1]] = value;
  return clone;
}

const ServicePatchFormTill27Sep = ({ serviceData, slug, onPatched }) => {
  const [field, setField] = useState("");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Flatten all fields for dropdown
  const keys = serviceData && serviceData.data ? flattenFields(serviceData.data) : [];

  // Current value for selected field
  const currentValue = field ? getValueByPath(serviceData.data, field) : "";

  const handlePatch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // Deep clone and set value by path
      const newData = setValueByPath(serviceData.data, field, value);
      const payload = { data: newData };
      const res = await patchServiceBySlug(slug, payload);
      setSuccess("Patched successfully!");
      if (onPatched) onPatched(res);
    } catch (err) {
      setError(err.message || "PATCH failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded p-4 mt-6 bg-gray-50">
      <h3 className="font-bold text-lg mb-2 text-[#6777EF]">Quick PATCH Editor</h3>
      <form onSubmit={handlePatch} className="flex flex-col gap-3">
          <label className="font-semibold mb-2 block text-gray-700">Select Field:</label>
        <select
          value={field}
          onChange={e => {
            setField(e.target.value);
            setValue("");
          }}
          className="border rounded px-2 py-1"
        >
              <option value="">-- Select --</option>
          {keys.map(k => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
        {field && (
          <>
              <label className="font-semibold mb-2 block text-gray-700">New Value:</label>
            <textarea
              type="text"
              value={value}
              onChange={e => setValue(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full min-h-[60px] focus:outline-none focus:ring-2 focus:ring-[#6777EF] bg-gray-50 text-gray-700 resize-y transition-all duration-150 shadow-sm hover:border-[#6777EF]"
              placeholder={`Current: ${typeof currentValue === "object" ? JSON.stringify(currentValue) : currentValue}`}
            />
          </>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
          disabled={loading || !field}
        >
          {loading ? "Saving..." : "PATCH"}
        </button>
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-600">{success}</div>}
      </form>
    </div>
  );
};

export default ServicePatchFormTill27Sep;
