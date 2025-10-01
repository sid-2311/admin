import React, { useState } from "react";



// Utility to check if a string is an image URL
const isImageUrl = (url) =>
  typeof url === "string" &&
  /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(url);

const placeholder = "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";

const fileUploadStyle =
  "w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer";





// Main component
const ServiceInputForm2 = ({ serviceData }) => {

  console.log("Rendering Fields", serviceData?.data);
  // State to hold selected image files
  const [imageFiles, setImageFiles] = useState({});

  if (!serviceData)
    return <div className="text-red-500 p-4">No service data found.</div>;

  // Recursive field renderer
  const renderFields = (dataObj) => {
    return Object.entries(dataObj).map(([key, value]) => {
      // Array handling
      if (Array.isArray(value)) {
        return (
          <div key={key} className="mb-8">
            {/* Section header for array */}
            <div className="font-bold text-lg mb-2 text-[#6777EF] flex items-center gap-2">
              {key.replace(/([A-Z])/g, " $1")} List
              <span className="text-xs text-gray-400">[{value.length} items]</span>
            </div>
            <div className="flex flex-col gap-4">
              {value.map((item, idx) => (
                <div key={idx} className="border rounded-lg bg-gray-50 p-4 shadow-sm">
                  <div className="font-semibold text-gray-700 mb-2">
                    <span title={`Backend array key: ${key}`}>{key.replace(/([A-Z])/g, " $1")} #{idx + 1}</span>
                  </div>
                  {/* Render array item fields */}
                  {typeof item === "string"
                    ? isImageUrl(item)
                      ? (
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1" title={`Image field for backend PATCH. Key: ${key}_${idx}`}>Image:</label>
                          <div className="flex items-center gap-4">
                            <img
                              src={
                                imageFiles[`${key}_${idx}`]
                                  ? URL.createObjectURL(imageFiles[`${key}_${idx}`])
                                  : item || placeholder
                              }
                              alt={key + idx}
                              className="h-16 border rounded shadow"
                              style={{ maxWidth: 120, objectFit: "contain" }}
                            />
                            <div className="flex flex-col gap-1">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, `${key}_${idx}`)}
                                className={fileUploadStyle}
                                title={`Upload a new image file for key: ${key}_${idx}`}
                              />
                              <span className="text-xs text-gray-500">
                                {imageFiles[`${key}_${idx}`]?.name
                                  ? `Selected: ${imageFiles[`${key}_${idx}`].name}`
                                  : item
                                    ? `Current: ${item.split('/').pop()}`
                                    : "No image selected. Placeholder shown."}
                              </span>
                            </div>
                            {(imageFiles[`${key}_${idx}`] || item) && (
                              <button
                                type="button"
                                className="ml-2 px-2 py-1 bg-red-100 text-red-600 rounded text-xs"
                                title={`Remove image for key: ${key}_${idx} and revert to placeholder`}
                                onClick={() => {
                                  setImageFiles(prev => ({ ...prev, [`${key}_${idx}`]: null }));
                                }}
                              >Remove Image</button>
                            )}
                          </div>
                        </div>
                      )
                      : item
                    : typeof item === "object"
                    ? (
                      <div className="pl-2">
                        {Object.entries(item).map(([subKey, subVal]) => (
                          <div key={subKey} className="mb-2">
                            <span className="font-medium" title={`Backend key: ${subKey}`}>{subKey.replace(/([A-Z])/g, " $1")}: {" "}</span>
                            <span>
                              {typeof subVal === "string" && isImageUrl(subVal) ? (
                                <span>
                                  <label className="block text-xs text-gray-500 mb-1" title={`Image field for backend PATCH. Key: ${key}_${idx}_${subKey}`}>Image:</label>
                                  <div className="flex items-center gap-4">
                                    <img
                                      src={
                                        imageFiles[`${key}_${idx}_${subKey}`]
                                          ? URL.createObjectURL(imageFiles[`${key}_${idx}_${subKey}`])
                                          : subVal || placeholder
                                      }
                                      alt={subKey}
                                      className="h-16 border rounded shadow"
                                      style={{ maxWidth: 120, objectFit: "contain" }}
                                    />
                                    <div className="flex flex-col gap-1">
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, `${key}_${idx}_${subKey}`)}
                                        className={fileUploadStyle}
                                        title={`Upload a new image file for key: ${key}_${idx}_${subKey}`}
                                      />
                                      <span className="text-xs text-gray-500">
                                        {imageFiles[`${key}_${idx}_${subKey}`]?.name
                                          ? `Selected: ${imageFiles[`${key}_${idx}_${subKey}`].name}`
                                          : subVal
                                            ? `Current: ${subVal.split('/').pop()}`
                                            : "No image selected. Placeholder shown."}
                                      </span>
                                    </div>
                                    {(imageFiles[`${key}_${idx}_${subKey}`] || subVal) && (
                                      <button
                                        type="button"
                                        className="ml-2 px-2 py-1 bg-red-100 text-red-600 rounded text-xs"
                                        title={`Remove image for key: ${key}_${idx}_${subKey} and revert to placeholder`}
                                        onClick={() => {
                                          setImageFiles(prev => ({ ...prev, [`${key}_${idx}_${subKey}`]: null }));
                                        }}
                                      >Remove Image</button>
                                    )}
                                  </div>
                                </span>
                              ) : typeof subVal === "string"
                                ? subVal
                                : JSON.stringify(subVal)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )
                    : JSON.stringify(item)}
                </div>
              ))}
              {/* Add New button for array section (future extensibility) */}
              <button type="button" className="mt-2 px-3 py-1 bg-blue-50 text-blue-700 rounded text-sm self-start border border-blue-200 hover:bg-blue-100">+ Add New {key.replace(/([A-Z])/g, " $1")}</button>
            </div>
          </div>
        );
      }

      // Nested object handling
      if (typeof value === "object" && value !== null) {
        return (
          <div key={key} className="mb-4">
            <label
              className="block font-semibold capitalize mb-1 text-gray-700"
              title={`Backend object key: ${key}`}
            >
              {key.replace(/([A-Z])/g, " $1")}: 
            </label>
            <div className="ml-4 border-l-2 border-gray-200 pl-4">
              {renderFields(value)}
            </div>
          </div>
        );
      }
      // Primitive value
      return (
        <div key={key} className="mb-4">
          <label
            className="block font-semibold capitalize mb-1 text-gray-700"
            title={`Backend key: ${key}`}
          >
            {key.replace(/([A-Z])/g, " $1")}: 
          </label>
          <span>{value}</span>
        </div>
      );
    });
  };

  // Dummy file change handler (replace with your logic)
  const handleFileChange = (e, fieldKey) => {
    const file = e.target.files[0];
    if (file) {
      setImageFiles(prev => ({ ...prev, [fieldKey]: file }));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-[#6777EF]">Service Data</h2>
      <div className="grid grid-cols-1 gap-6">
        {renderFields(serviceData.data)}
      </div>
    </div>
  );
}

export default ServiceInputForm2;