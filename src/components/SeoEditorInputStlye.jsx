// components/SeoEditorInputStlye.jsx
import React, { useState, useEffect } from "react";
import { patchServiceBySlug } from "../api/api"; // tumhare existing api helper use karo

// EN: SEO editor card component
// HI: SEO edit karne wala card component
const SeoEditorInputStlye = ({ seo: initialSeo = {}, slug, onUpdated }) => {
  const [seo, setSeo] = useState(initialSeo || {});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setSeo(initialSeo || {});
  }, [initialSeo]);

  // EN: handle saving whole seo object via patch
  // HI: poore seo object ko backend me bhejne ka function
  const handleSave = async () => {
    setLoading(true);
    setMsg("");
    try {
      // Send PATCH with path 'seo' (backend now allows top-level seo)
      await patchServiceBySlug(slug, { path: "seo", value: seo });
      setMsg("SEO updated successfully ✅");
      if (onUpdated) onUpdated(); // parent can refresh
    } catch (err) {
      console.error(err);
      setMsg(err?.message || "Save failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // small controlled input helper
  const update = (key, value) => setSeo(prev => ({ ...prev, [key]: value }));

  // openGraph nested helper
  const updateOG = (key, value) => {
    setSeo(prev => ({ ...prev, openGraph: { ...(prev.openGraph || {}), [key]: value }}));
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h3 className="text-lg font-semibold text-indigo-600 mb-4">SEO Settings / SEO सेटिंग्स</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title / SEO Title</label>
          <input
            value={seo.title || ""}
            onChange={(e) => update("title", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-200 bg-gray-50 px-3 py-2"
            placeholder="Enter SEO title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description / SEO Description</label>
          <textarea
            value={seo.description || ""}
            onChange={(e) => update("description", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-200 bg-gray-50 px-3 py-2 min-h-[80px]"
            placeholder="Enter meta description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Canonical / Canonical URL (slug)</label>
          <input
            value={seo.canonical || ""}
            onChange={(e) => update("canonical", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-200 bg-gray-50 px-3 py-2"
            placeholder="e.g. blockchain-identity-verification"
          />
        </div>

        {/* OpenGraph (basic fields) */}
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-700 mb-2">OpenGraph</h4>

          <div className="mb-2">
            <label className="block text-sm">OG Title</label>
            <input
              value={seo.openGraph?.title || ""}
              onChange={(e) => updateOG("title", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-200 bg-gray-50 px-3 py-2"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm">OG Description</label>
            <input
              value={seo.openGraph?.description || ""}
              onChange={(e) => updateOG("description", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-200 bg-gray-50 px-3 py-2"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm">OG URL</label>
            <input
              value={seo.openGraph?.url || ""}
              onChange={(e) => updateOG("url", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-200 bg-gray-50 px-3 py-2"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm">OG Image URL (first image)</label>
            <input
              value={(seo.openGraph?.images && seo.openGraph.images[0]?.url) || ""}
              onChange={(e) => {
                const url = e.target.value;
                setSeo(prev => ({
                  ...prev,
                  openGraph: {
                    ...(prev.openGraph || {}),
                    images: [{ ...(prev.openGraph?.images?.[0] || {}), url }]
                  }
                }));
              }}
              className="mt-1 block w-full rounded-md border-gray-200 bg-gray-50 px-3 py-2"
              placeholder="/assets/home-og-image.jpg"
            />
            <p className="text-xs text-gray-400 mt-1">
              Note: Image upload not included here. If you want upload, implement upload API and save returned URL here.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            {loading ? "Saving..." : "Save SEO"}
          </button>

          <button
            type="button"
            onClick={() => setSeo(initialSeo || {})}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
          >
            Reset
          </button>
        </div>

        {msg && <div className="text-sm mt-2 text-gray-600">{msg}</div>}
      </div>
    </div>
  );
};

export default SeoEditorInputStlye;
