import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { patchServiceBySlug } from "../api/api";
import { loadServiceByAnySlug } from "../store/serviceSlice";

// EN: Input Form for adding/updating full SEO object
// HI: पूरा SEO object add/update करने के लिए input form
const SeoMetaInputForm = ({ serviceData, slug }) => {
  const dispatch = useDispatch();
  const [seoData, setSeoData] = useState(serviceData?.seo || {});

  // console.log("SEO Data:", seoData);
  
  

  // handle input change
  const handleChange = (path, value) => {
    setSeoData((prev) => ({
      ...prev,
      [path]: value,
    }));
  };

  // handle nested change (like openGraph fields)
  const handleNestedChange = (parent, key, value) => {
    setSeoData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [key]: value,
      },
    }));
  };

  // save entire seo object
  const handleSave = async () => {
    try {
      await patchServiceBySlug(slug, { path: "seo", value: seoData });
      dispatch(loadServiceByAnySlug(slug));
      alert("SEO Saved Successfully ✅");
    } catch (err) {
      console.error("Failed to save SEO:", err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 space-y-4">
      <h3 className="text-lg font-semibold text-indigo-600">SEO Meta Input Form</h3>

      {/* SEO Title */}
      <div className="flex flex-col">
        <label className="font-medium text-gray-700 mb-1">SEO Title</label>
        <input
          value={seoData.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          className="rounded-md border border-gray-200 px-3 py-2 bg-gray-50"
        />
      </div>

      {/* SEO Description */}
      <div className="flex flex-col">
        <label className="font-medium text-gray-700 mb-1">SEO Description</label>
        <textarea
          value={seoData.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          className="rounded-md border border-gray-200 px-3 py-2 bg-gray-50"
        />
      </div>

      {/* Canonical */}
      <div className="flex flex-col">
        <label className="font-medium text-gray-700 mb-1">Canonical</label>
        <input
          value={seoData.canonical || ""}
          onChange={(e) => handleChange("canonical", e.target.value)}
          className="rounded-md border border-gray-200 px-3 py-2 bg-gray-50"
        />
      </div>

      {/* OpenGraph Fields */}
      <h4 className="text-md font-semibold text-gray-600">OpenGraph</h4>

      <div className="flex flex-col">
        <label className="font-medium text-gray-700 mb-1">OG Title</label>
        <input
          value={seoData.openGraph?.title || ""}
          onChange={(e) => handleNestedChange("openGraph", "title", e.target.value)}
          className="rounded-md border border-gray-200 px-3 py-2 bg-gray-50"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-medium text-gray-700 mb-1">OG Description</label>
        <input
          value={seoData.openGraph?.description || ""}
          onChange={(e) => handleNestedChange("openGraph", "description", e.target.value)}
          className="rounded-md border border-gray-200 px-3 py-2 bg-gray-50"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-medium text-gray-700 mb-1">OG URL</label>
        <input
          value={seoData.openGraph?.url || ""}
          onChange={(e) => handleNestedChange("openGraph", "url", e.target.value)}
          className="rounded-md border border-gray-200 px-3 py-2 bg-gray-50"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-medium text-gray-700 mb-1">OG Image</label>
        <input
          value={seoData.openGraph?.images?.[0]?.url || ""}
          onChange={(e) =>
            setSeoData((prev) => ({
              ...prev,
              openGraph: {
                ...prev.openGraph,
                images: [{ url: e.target.value }],
              },
            }))
          }
          className="rounded-md border border-gray-200 px-3 py-2 bg-gray-50"
        />
      </div>

      <button
        type="button"
        onClick={handleSave}
        className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
      >
        Save SEO
      </button>
    </div>
  );
};

export default SeoMetaInputForm;
