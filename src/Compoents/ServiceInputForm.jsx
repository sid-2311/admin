import React, { useState } from "react";

// Utility: check if string is an image URL
// उपयोगिता: ये चेक करता है कि string ek image URL hai ya nahi
const isImageUrl = (url) =>
  typeof url === "string" &&
  /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(url);

// Placeholder image (jab actual image na ho tab)
// Placeholder image (when actual image is missing)
const placeholder =
  "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";

// File input styling
// File input ke liye TailwindCSS style
const fileUploadStyle =
  "w-full text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 cursor-pointer transition";

const ServiceInputForm = ({ serviceData }) => {
  // State to hold selected image files
  // Image files ko temporarily rakhne ke liye state
  const [imageFiles, setImageFiles] = useState({});

  if (!serviceData)
    return <div className="text-red-500 p-4">No service data found.</div>;

  // File change handler
  // File change hone par imageFiles update hota hai
  const handleFileChange = (e, fieldKey) => {
    const file = e.target.files[0];
    if (file) {
      setImageFiles((prev) => ({ ...prev, [fieldKey]: file }));
    }
  };

  // Reusable image upload + remove section
  // Bar-bar repeat hone wale code ko yahan manage kiya gaya hai
  const renderImageUpload = (fieldKey, currentValue) => (
    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
      {/* Image Preview */}
      <img
        src={
          imageFiles[fieldKey]
            ? URL.createObjectURL(imageFiles[fieldKey])
            : currentValue || placeholder
        }
        alt={fieldKey}
        className="h-24 w-32 object-contain border rounded-lg shadow-sm bg-gray-50"
      />

      {/* Upload + Remove Controls */}
      <div className="flex flex-col gap-3 flex-1">
        {/* File Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, fieldKey)}
          className={fileUploadStyle}
        />

        {/* File Name / Status */}
        <span className="text-xs text-gray-500 italic">
          {imageFiles[fieldKey]?.name
            ? `Selected: ${imageFiles[fieldKey].name}` // EN
            : currentValue
              ? `Current: ${currentValue.split("/").pop()}` // EN
              : "No image selected"}{" "}
          {/* EN */}
          {/* Hindi: Yahan par batata hai ki konsa file select hai ya abhi placeholder dikha raha hai */}
        </span>

        {/* Remove Button */}
        {(imageFiles[fieldKey] || currentValue) && (
          <button
            type="button"
            className="self-start px-4 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100 transition"
            onClick={() =>
              setImageFiles((prev) => ({
                ...prev,
                [fieldKey]: null,
              }))
            }
          >
            Remove Image
          </button>
        )}
      </div>
    </div>
  );

  // Recursive field renderer
  // Yeh function sabhi types of fields render karta hai (string, object, array, image)
  const renderFields = (dataObj) => {
    return Object.entries(dataObj).map(([key, value]) => {
      // Array handling
      if (Array.isArray(value)) {
        return (
          <div key={key} className="mb-10">
            {/* Section Header */}
            <div className="flex items-center justify-between border-b pb-2 mb-4">
              <h3 className="text-lg font-semibold text-indigo-600">
                {key.replace(/([A-Z])/g, " $1")} List
              </h3>
              <span className="text-xs text-gray-500">{value.length} items</span>
            </div>

            {/* Array Items */}
            <div className="flex flex-col gap-6">
              {value.map((item, idx) => (
                <div
                  key={idx}
                  className="group border rounded-xl bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-200 hover:border-indigo-200"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                      {key.replace(/([A-Z])/g, " $1")} #{idx + 1}
                    </h4>
                    <span className="text-xs text-gray-400">Card {idx + 1}</span>
                  </div>

                  {/* Card Content */}
                  <div className="space-y-3">
                    {/* String as Image */}
                    {typeof item === "string" ? (
                      isImageUrl(item) ? (
                        renderImageUpload(`${key}_${idx}`, item)
                      ) : (
                        <p className="text-gray-700">{item}</p>
                      )
                    ) : typeof item === "object" ? (
                      // Object inside Array
                      <div className="space-y-4">
                        {Object.entries(item).map(([subKey, subVal]) =>
                          subKey === "_id" ? null : (
                            <div
                              key={subKey}
                              className="flex flex-col bg-gray-50 p-3 rounded-lg border border-gray-100"
                            >
                              <span className="font-medium text-gray-700 mb-1">
                                {subKey.replace(/([A-Z])/g, " $1")}:
                              </span>
                              <span className="text-sm text-gray-600">
                                {typeof subVal === "string" && isImageUrl(subVal)
                                  ? renderImageUpload(`${key}_${idx}_${subKey}`, subVal)
                                  : typeof subVal === "string"
                                    ? subVal
                                    : JSON.stringify(subVal)}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      JSON.stringify(item)
                    )}
                  </div>
                </div>
              ))}

            </div>

            {/* Add Button */}
            <button
              type="button"
              className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium border border-indigo-200 hover:bg-indigo-100 transition"
            >
              + Add New {key.replace(/([A-Z])/g, " $1")}
            </button>
          </div>
        );
      }

      // Nested object handling
      if (typeof value === "object" && value !== null) {
        return (
          <div key={key} className="mb-6">
            <label className="block font-semibold text-gray-800 mb-2">
              {key.replace(/([A-Z])/g, " $1")}:
            </label>
            <div className="ml-4 border-l-2 border-gray-200 pl-4 space-y-3">
              {renderFields(value)}
            </div>
          </div>
        );
      }

      // Primitive values
      return (
        <div key={key} className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">
            {key.replace(/([A-Z])/g, " $1")}:
          </label>
          <p className="text-gray-600">{value}</p>
        </div>
      );
    });
  };

  // Main UI Wrapper
  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6 text-indigo-600">
        Service Data
      </h2>

      {/* Dynamic Fields */}
      <div className="grid grid-cols-1 gap-8">{renderFields(serviceData.data)}</div>
    </div>
  );
};

export default ServiceInputForm;
