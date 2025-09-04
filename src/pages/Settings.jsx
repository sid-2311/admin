// src/pages/Settings.jsx
import { useState } from "react";

const Settings = () => {
  const [siteName, setSiteName] = useState("My Admin Panel");

  const handleSave = () => {
    alert(`Saved Settings: ${siteName}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">⚙️ Settings</h1>

      <div className="bg-white p-6 rounded-lg shadow w-96">
        <label className="block mb-2 font-semibold">Site Name</label>
        <input
          type="text"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Settings;
