// components/SeoPatchForm.jsx
import React from "react";
import { patchServiceBySlug } from "../api/api"; // tumhara API helper
import { useDispatch } from "react-redux";
import { loadServiceByAnySlug } from "../store/serviceSlice"; // tumhara redux slice

// EN: Row-style editor for SEO fields
// HI: SEO fields ko row ke format me edit karne wala form
const SeoPatchForm = ({ serviceData, slug }) => {
  const dispatch = useDispatch();

  // generic patch handler
  const handlePatch = async (path, value) => {
    try {
      await patchServiceBySlug(slug, { path, value });
      dispatch(loadServiceByAnySlug(slug));
    } catch (err) {
      console.error("SEO Patch failed:", err);
    }
  };

  const seo = serviceData?.seo || {};

  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 space-y-4">
      <h3 className="text-lg font-semibold text-indigo-600">SEO Settings / SEO सेटिंग्स</h3>
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <label className="font-medium text-gray-700 w-40">SEO Title</label>
        <input
          defaultValue={seo.title}
          onBlur={(e) => handlePatch("seo.title", e.target.value)}
          className="flex-1 rounded-md border-gray-200 bg-gray-50 px-3 py-2"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <label className="font-medium text-gray-700 w-40">SEO Description</label>
        <textarea
          defaultValue={seo.description}
          onBlur={(e) => handlePatch("seo.description", e.target.value)}
          className="flex-1 rounded-md border-gray-200 bg-gray-50 px-3 py-2 min-h-[80px]"
        />
      </div>

      {/* Canonical */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <label className="font-medium text-gray-700 w-40">Canonical</label>
        <input
          defaultValue={seo.canonical}
          onBlur={(e) => handlePatch("seo.canonical", e.target.value)}
          className="flex-1 rounded-md border-gray-200 bg-gray-50 px-3 py-2"
        />
      </div>

      {/* OpenGraph Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <label className="font-medium text-gray-700 w-40">OG Title</label>
        <input
          defaultValue={seo.openGraph?.title}
          onBlur={(e) => handlePatch("seo.openGraph.title", e.target.value)}
          className="flex-1 rounded-md border-gray-200 bg-gray-50 px-3 py-2"
        />
      </div>

      {/* OpenGraph Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <label className="font-medium text-gray-700 w-40">OG Description</label>
        <input
          defaultValue={seo.openGraph?.description}
          onBlur={(e) => handlePatch("seo.openGraph.description", e.target.value)}
          className="flex-1 rounded-md border-gray-200 bg-gray-50 px-3 py-2"
        />
      </div>

      {/* OpenGraph URL */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <label className="font-medium text-gray-700 w-40">OG URL</label>
        <input
          defaultValue={seo.openGraph?.url}
          onBlur={(e) => handlePatch("seo.openGraph.url", e.target.value)}
          className="flex-1 rounded-md border-gray-200 bg-gray-50 px-3 py-2"
        />
      </div>

      {/* OpenGraph Image URL */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <label className="font-medium text-gray-700 w-40">OG Image URL</label>
        <input
          defaultValue={seo.openGraph?.images?.[0]?.url}
          onBlur={(e) => handlePatch("seo.openGraph.images.0.url", e.target.value)}
          className="flex-1 rounded-md border-gray-200 bg-gray-50 px-3 py-2"
        />
      </div>
    </div>
  );
};

export default SeoPatchForm;
