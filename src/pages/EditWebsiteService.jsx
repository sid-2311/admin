import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { fetchServiceByAnySlug, checkSlugExists } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { updateServiceThunk } from "../store/serviceSlice";

export default function EditWebsiteService() {
  // 🧭 Navigation & Redux setup
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔄 Get data from location state (if editing existing service)
  const editData = location.state?.editData;
  const { loading, error } = useSelector((state) => state.service);

  // ⚙️ Component-level states
  const [localLoading, setLocalLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [slugError, setSlugError] = useState("");

  // 📝 Form data state
  const [formData, setFormData] = useState({
    slug: "",
    serviceType: "",
    subcategoryName: "",
    subcategorySlug: "",
    status: true,
    deletedAt: null,
  });

  // ⏱️ useRef for debounce timeout (to prevent re-declaration every render)
  const slugTimeoutRef = useRef(null);

  // 🧩 Load existing data when page opens or slug changes
  useEffect(() => {
    if (editData) {
      setFormData({
        slug: editData.slug || "",
        serviceType: editData.serviceType || "",
        subcategoryName: editData.subcategoryName || "",
        subcategorySlug: editData.subcategorySlug || "",
        status: editData.status ?? true,
        deletedAt: editData.deletedAt || null,
      });
    } else if (location.state?.slug) {
      setLocalLoading(true);
      fetchServiceByAnySlug(location.state.slug)
        .then((data) => {
          setFormData({
            slug: data.slug || "",
            serviceType: data.serviceType || "",
            subcategoryName: data.subcategoryName || "",
            subcategorySlug: data.subcategorySlug || "",
            status: data.status ?? true,
            deletedAt: data.deletedAt || null,
          });
        })
        .catch(() => setSuccess("⚠️ Failed to fetch service data"))
        .finally(() => setLocalLoading(false));
    }
  }, [editData, location.state]);

  // ----------------------------------------------------------------------
  // 🧠 Function: Handle Input Changes + Slug Debounce Check
  // (Slug change hone par 500ms delay ke baad API se check karega)
  // ----------------------------------------------------------------------
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "slug") {
      const newSlug = value.trim(); // Remove extra spaces
      setFormData((prev) => ({ ...prev, slug: newSlug }));

      // ❌ If empty, clear error
      if (!newSlug) {
        setSlugError("");
        return;
      }

      // ⚙️ If editing and slug is unchanged → skip check
      if (editData && newSlug === editData.slug) {
        setSlugError("");
        return;
      }

      // ✅ Debounce Logic (500ms delay)
      if (slugTimeoutRef.current) clearTimeout(slugTimeoutRef.current);
      slugTimeoutRef.current = setTimeout(async () => {
        try {
          const exists = await checkSlugExists(newSlug.toLowerCase());
          if (exists) {
            setSlugError("⚠️ This slug already exists. Please choose another.");
          } else {
            setSlugError("");
          }
        } catch (error) {
          console.error("Slug check failed:", error);
          setSlugError("❌ Error checking slug availability.");
        }
      }, 500);
    }

    // 🔄 Status Dropdown Change
    else if (name === "status") {
      setFormData((prev) => ({ ...prev, status: value === "Active" }));
    }

    // 🧾 General Field Change
    else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // ----------------------------------------------------------------------
  // ✏️ Function: Handle Update Button Click
  // (Validates slug, dispatches Redux thunk, navigates back on success)
  // ----------------------------------------------------------------------
  const handleUpdate = async () => {
    if (slugError) return; // Stop if slug invalid
    setLocalLoading(true);
    setSuccess("");

    try {
      const payload = { ...formData, slug: formData.slug };
      await dispatch(updateServiceThunk({ slug: editData.slug, payload }));
      setSuccess("✅ Service updated successfully!");
      setTimeout(() => navigate(-1), 1000); // Navigate after short delay
    } catch (err) {
      console.error("Update failed:", err);
      setSuccess("");
    } finally {
      setLocalLoading(false);
    }
  };

  // ----------------------------------------------------------------------
  // ⛔ Function: Cancel Button → Go Back
  // ----------------------------------------------------------------------
  const handleCancel = () => {
    navigate(-1);
  };

  // ----------------------------------------------------------------------
  // 🖼️ UI Rendering Section
  // ----------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#F4F6F9] p-6">
      <div className="mx-auto">
        {/* 🔹 Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div
              className="inline-flex items-center bg-blue-600 text-white my-4 px-4 py-2 rounded-md font-medium text-sm cursor-pointer"
              onClick={handleCancel}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              Website Service List
            </div>
          </div>
        </div>

        {/* 🧾 Main Form Section */}
        <div className="bg-white shadow-sm p-8 rounded-lg">
          <div className="space-y-6">
            {(localLoading || loading) && (
              <div className="text-blue-500 mb-2">Loading...</div>
            )}
            {error && <div className="text-red-500 mb-2">{error}</div>}
            {success && <div className="text-green-500 mb-2">{success}</div>}

            {/* 🔖 Slug Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#FDFDFF] border border-gray-300 rounded-md 
                focus:outline-none focus:ring-0.5 focus:ring-[#BBC2F8] focus:border-[#BBC2F8] text-gray-900"
              />
              {slugError && (
                <div className="text-red-500 text-xs mt-1">{slugError}</div>
              )}
            </div>

            {/* 🧱 Service Type Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Type
              </label>
              <input
                type="text"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#FDFDFF] border border-gray-300 rounded-md 
                focus:outline-none focus:ring-0.5 focus:ring-[#BBC2F8] focus:border-[#BBC2F8] text-gray-900"
              />
            </div>

            {/* 🗂️ Subcategory Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subcategory Name
              </label>
              <input
                type="text"
                name="subcategoryName"
                value={formData.subcategoryName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#FDFDFF] border border-gray-300 rounded-md 
                focus:outline-none focus:ring-0.5 focus:ring-[#BBC2F8] focus:border-[#BBC2F8] text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subcategory Slug
              </label>
              <input
                type="text"
                name="subcategorySlug"
                value={formData.subcategorySlug}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#FDFDFF] border border-gray-300 rounded-md 
                focus:outline-none focus:ring-0.5 focus:ring-[#BBC2F8] focus:border-[#BBC2F8] text-gray-900"
              />
            </div>

            {/* ⚙️ Status Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div className="relative">
                <select
                  name="status"
                  value={formData.status ? "Active" : "Inactive"}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-[#FDFDFF] border border-gray-300 rounded-md 
                  focus:outline-none focus:ring-0.5 focus:ring-[#BBC2F8] focus:border-[#BBC2F8] text-gray-900 appearance-none pr-8"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <span className="text-blue-500 text-xs mt-1"> Note:- ⚠️this will update all the fields to both navbar and website collections as per there names</span>

            {/* 🔘 Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleUpdate}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md 
                transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>

              <button
                onClick={handleCancel}
                className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-6 rounded-md 
                transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 cursor-pointer"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
