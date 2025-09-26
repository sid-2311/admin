import React from "react";

const ServiceInputForm = ({ serviceData }) => {
  if (!serviceData)
    return <div className="text-red-500">No service data found.</div>;

  // Enhanced field rendering with better UI
  const renderFields = (data) => {
    if (!data) return null;
    return Object.entries(data).map(([key, value]) => {
      if (typeof value === "string") {
        return (
          <div key={key} className="mb-4">
            <label className="block font-semibold capitalize mb-1 text-gray-700">
              {key.replace(/([A-Z])/g, " $1")}:
            </label>
            <input
              type="text"
              value={value}
              className="border border-gray-300 rounded px-3 py-2 w-full bg-gray-50 text-gray-900"
              readOnly
            />
          </div>
        );
      }
      if (Array.isArray(value)) {
        return (
          <div key={key} className="mb-4">
            <label className="block font-semibold capitalize mb-1 text-gray-700">
              {key.replace(/([A-Z])/g, " $1")}:
            </label>
            <ul className="list-disc ml-6 bg-gray-50 p-2 rounded">
              {value.map((item, idx) => (
                <li key={idx} className="mb-1">
                  {typeof item === "string"
                    ? item
                    : typeof item === "object"
                    ? (
                      <div className="pl-2">
                        {Object.entries(item).map(([subKey, subVal]) => (
                          <div key={subKey}>
                            <span className="font-medium">
                              {subKey.replace(/([A-Z])/g, " $1")}:{" "}
                            </span>
                            <span>
                              {typeof subVal === "string"
                                ? subVal
                                : JSON.stringify(subVal)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )
                    : JSON.stringify(item)}
                </li>
              ))}
            </ul>
          </div>
        );
      }
      if (typeof value === "object" && value !== null) {
        return (
          <div key={key} className="mb-4">
            <label className="block font-semibold capitalize mb-1 text-gray-700">
              {key.replace(/([A-Z])/g, " $1")}:
            </label>
            <div className="ml-4 border-l-2 border-gray-200 pl-4">
              {renderFields(value)}
            </div>
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div className="mt-6 p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-bold mb-4 text-[#6777EF]">Service Data</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {renderFields(serviceData.data)}
      </div>
    </div>
  );
};

export default ServiceInputForm;