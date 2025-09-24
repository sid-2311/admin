import React from "react";

const ServiceInputForm = ({ serviceData }) => {
  if (!serviceData)
    return <div className="text-red-500">No service data found.</div>;

  // Flatten all keys in serviceData.data for display
  const renderFields = (data) => {
    if (!data) return null;
    return Object.entries(data).map(([key, value]) => {
      if (typeof value === "string") {
        return (
          <div key={key} className="mb-2">
            <label className="font-semibold capitalize">{key}:</label>
            <input
              type="text"
              value={value}
              className="border rounded px-2 py-1 ml-2 w-full"
              readOnly
            />
          </div>
        );
      }
      if (Array.isArray(value)) {
        return (
          <div key={key} className="mb-2">
            <label className="font-semibold capitalize">{key}:</label>
            <ul className="list-disc ml-6">
              {value.map((item, idx) => (
                <li key={idx}>
                  {typeof item === "string"
                    ? item
                    : JSON.stringify(item)}
                </li>
              ))}
            </ul>
          </div>
        );
      }
      if (typeof value === "object" && value !== null) {
        return (
          <div key={key} className="mb-2">
            <label className="font-semibold capitalize">{key}:</label>
            <div className="ml-4">{renderFields(value)}</div>
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div className="mt-6 p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-bold mb-4">Service Data</h2>
      {renderFields(serviceData.data)}
    </div>
  );
};

export default ServiceInputForm;