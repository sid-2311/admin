import React, { useState } from "react";
import { patchServiceBySlug } from "../api/api";

// Utility: flatten nested fields into "path.to.field"
// English: This function recursively collects all nested field paths
// Hindi: Yeh function recursively har ek nested field ka path generate karta hai
function flattenFields(obj, prefix = "") {
  let fields = [];

  if (Array.isArray(obj)) {
    obj.forEach((item, idx) => {
      const arrPrefix = prefix ? `${prefix}[${idx}]` : `[${idx}]`;
      if (typeof item === "object" && item !== null) {
        fields = fields.concat(flattenFields(item, arrPrefix));
      } else {
        fields.push(arrPrefix); // primitive value
      }
    });
  } else if (typeof obj === "object" && obj !== null) {
    Object.entries(obj).forEach(([key, value]) => {
      const newPrefix = prefix ? `${prefix}.${key}` : key;
      if (Array.isArray(value)) {
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

// Utility: get nested value from object by path
// English: Finds the current value of a field by its path
// Hindi: Field ka current value uske path se fetch karta hai
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

const ServicePatchForm = ({ serviceData, slug, onPatched }) => {
  // English: Form state variables
  // Hindi: Form ke liye state variables
  const [field, setField] = useState(""); // selected field path
  const [value, setValue] = useState(""); // new value
  const [loading, setLoading] = useState(false); // loading state
  const [error, setError] = useState(""); // error message
  const [success, setSuccess] = useState(""); // success message

  // English: Get all field paths
  // Hindi: Sabhi field ke paths nikalna
  const keys =
    serviceData && serviceData.data ? flattenFields(serviceData.data) : [];

  // English: Current field ka value (to show as placeholder)
  // Hindi: Current field value (jo placeholder me dikhana hai)
  const currentValue = field ? getValueByPath(serviceData.data, field) : "";

  // Form submit (PATCH request)
  // English: Sends selected field + new value to backend
  // Hindi: Selected field aur naya value backend ko bhejna
  const handlePatch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const payload = { path: field, value: value };
      const res = await patchServiceBySlug(slug, payload);
      setSuccess("Patched successfully! ✅");
      if (onPatched) onPatched(res);
    } catch (err) {
      setError(err.message || "PATCH failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-xl p-6 mt-6 bg-white shadow-md">
      {/* Heading */}
      <h3 className="font-bold text-lg mb-4 text-indigo-600">
        Quick PATCH Editor
      </h3>

      <form onSubmit={handlePatch} className="flex flex-col gap-4">
        {/* Field Selector Dropdown */}
        {/* English: Dropdown for selecting which field to update
            Hindi: Dropdown jisme user select karega ki kaunsa field update karna hai */}
        <div>
          <label className="font-semibold mb-2 block text-gray-700">
            Select Field
          </label>
          <select
            value={field}
            onChange={(e) => {
              setField(e.target.value);
              setValue("");
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 text-gray-700 shadow-sm"
          >
            <option value="">-- Select Field --</option>
            {keys
              // English: Skip MongoDB system fields (_id, __v)
              // Hindi: MongoDB ke system fields (_id, __v) ko dropdown se hata do
              .filter((k) => !k.endsWith("._id") && !k.endsWith("__v"))
              .map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
          </select>
        </div>

        {/* New Value Input */}
        {/* English: Textarea where user enters new value
            Hindi: Textarea jisme user naya value input karega */}
        {field && (
          <div>
            <label className="font-semibold mb-2 block text-gray-700">
              New Value:
            </label>
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full min-h-[100px]     max-h-56 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 text-gray-700  shadow-sm resize-none"
              
              placeholder={`Current: ${
                typeof currentValue === "object"
                  ? JSON.stringify(currentValue)
                  : currentValue
              }`}
            />
             <br />
             <br />
            <span> <span className="font-bold">Current Value : </span> {currentValue}</span>
          </div>
        )}

        {/* Submit Button */}
        {/* English: Button to send PATCH request
            Hindi: Button jo PATCH request bhejta hai */}
        <button
          type="submit"
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || !field}
        >
          {loading ? "Saving..." : "Update Field"}
        </button>

        {/* Error / Success Messages */}
        {/* English: Show error/success feedback to user
            Hindi: User ko error ya success ka feedback dikhana */}
        {error && (
          <div className="text-red-500 font-medium text-sm">{error}</div>
        )}
        {success && (
          <div className="text-green-600 font-medium text-sm">{success}</div>
        )}
      </form>
    </div>
  );
};

export default ServicePatchForm;
