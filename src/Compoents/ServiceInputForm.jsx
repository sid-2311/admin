import React, { useState } from "react";



// Utility to check if a string is an image URL
const isImageUrl = (url) =>
  typeof url === "string" &&
  /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(url);

const placeholder = "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";

const fileUploadStyle =
  "w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer";





// Main component
const ServiceInputForm = ({ serviceData }) => {
  console.log("Rendering Fields", serviceData?.data);
  
  // State to hold selected image files
  const [imageFiles, setImageFiles] = useState({});
  console.log("imageFiles:", imageFiles);
  

  if (!serviceData)
    return <div className="text-red-500 p-4">No service data found.</div>;


  // Handle file input change
  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    setImageFiles((prev) => ({
      ...prev,
      [key]: file,
    }));
  };





  // Recursive function to render fields
  const renderFields = (data) => {
    if (!data) return null;
    //
    return Object.entries(data).map(([key, value]) => {
      if (typeof value === "string" && isImageUrl(value)) {
        // Image preview with file input
        return (
          <div key={key} className="mb-4">
            <label className="block font-semibold capitalize mb-1 text-gray-700">
            
              {key.replace(/([A-Z])/g, " $1")}:
            </label>
            <img
              src={
                imageFiles[key]
                  ? URL.createObjectURL(imageFiles[key])
                  : (value && isImageUrl(value))
                    ? value
                    : placeholder
              }
              alt={key}
              className="h-16 mb-2 border rounded shadow"
              style={{ maxWidth: 120, objectFit: "contain" }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, key)}
              className={fileUploadStyle}
            />
          </div>
        );
      }

      // Text input for normal strings
      if (typeof value === "string") {
        // Normal text field
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

      // Array handling and nested objects
      if (Array.isArray(value)) {
        return (
          <div key={key} className="mb-4">
            <label className="block font-semibold capitalize mb-1 text-gray-700">
              {key.replace(/([A-Z])/g, " $1")}:
            </label>
            <ul className="list-disc ml-6 bg-gray-50 p-2 rounded">
              {/* Render array items and their file inputs and previews */}
              {value.map((item, idx) => (
               
                
                <li key={idx} className="mb-1">
                  {typeof item === "string"
                    ? isImageUrl(item)
                      ? (
                        <div>
                          {/* Image preview  */}
                          <img
                            src={
                              imageFiles[`${key}_${idx}`]
                                ? URL.createObjectURL(imageFiles[`${key}_${idx}`])
                                : item || placeholder
                            }
                            alt={key + idx}
                            className="h-16 mb-2 border rounded shadow"
                            style={{ maxWidth: 120, objectFit: "contain" }}
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, `${key}_${idx}`)}
                            className={fileUploadStyle}
                          />
                        </div>
                      )
                      : item
                    : typeof item === "object"
                    ? (
                      <div className="pl-2">
                        {Object.entries(item).map(([subKey, subVal]) => (
                          <div key={subKey}>
                            <span className="font-medium">
                              {subKey.replace(/([A-Z])/g, " $1")}:{" "}
                            </span>
                            <span>
                              {typeof subVal === "string" && isImageUrl(subVal) ? (
                                <span>
                                  <img
                                    src={
                                      imageFiles[`${key}_${idx}_${subKey}`]
                                        ? URL.createObjectURL(imageFiles[`${key}_${idx}_${subKey}`])
                                        : subVal || placeholder
                                    }
                                    alt={subKey}
                                    className="h-16 mb-2 border rounded shadow"
                                    style={{ maxWidth: 120, objectFit: "contain" }}
                                  />
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, `${key}_${idx}_${subKey}`)}
                                    className={fileUploadStyle}
                                  />
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
                </li>
              ))}
            </ul>
          </div>
        );
      }

      // Nested object handling
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
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-[#6777EF]">Service Data</h2>
      <div className="grid grid-cols-1 gap-6">
        {renderFields(serviceData.data)}
      </div>
    </div>
  );
};

export default ServiceInputForm;