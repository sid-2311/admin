import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchServiceByAnySlug } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { updateServiceThunk } from "../store/serviceSlice";

export default function EditWebsiteService() {
  const location = useLocation();
  const navigate = useNavigate();
  const editData = location.state?.editData;

  
  const dispatch = useDispatch();
  const { loading, selected, error } = useSelector(state => state.service);
  
  const [localLoading, setLocalLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    slug: "",
    serviceType: "",

    subcategoryName: "",
    subcategorySlug: "",
    status: true,
    deletedAt: null,
  });

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
        .catch(() => setSuccess("Failed to fetch service"))
        .finally(() => setLocalLoading(false));
    }
  }, [editData, location.state]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "status") {
      setFormData((prev) => ({ ...prev, status: value === "Active" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }
  };

  // For nested data fields
  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      data: { ...prev.data, [name]: value },
    }));
  };

  console.log("Form Data:", formData);
  

const handleUpdate = async () => {
  setLocalLoading(true);
  setSuccess("");
  try {
    const payload = {
      ...formData,
      status: formData.status,
      slug: formData.slug,
    };
    await dispatch(updateServiceThunk({ slug: editData.slug, payload }));
    setSuccess("Service updated successfully!");
    navigate(-1);
  } catch (err) {
    setSuccess("");
  } finally {
    setLocalLoading(false);
  }
};

console.log("editData:", editData);


  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] p-6 ">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center bg-blue-600 text-white my-4 px-4 py-2 rounded-md font-medium text-sm cursor-pointer" onClick={handleCancel}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Website Service List
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white shadow-sm p-8">
          <div className="space-y-6">
            {(localLoading || loading) && <div className="text-blue-500 mb-2">Loading...</div>}
            {error && <div className="text-red-500 mb-2">{error}</div>}
            {success && <div className="text-green-500 mb-2">{success}</div>}

            {/* Slug Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#FDFDFF] border border-gray-300 rounded-md focus:outline-none focus:ring-0.5 focus:ring-[#BBC2F8] focus:border-[#BBC2F8] text-gray-900"
              />
            </div>

            {/* Service Type Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
              <input
                type="text"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#FDFDFF] border border-gray-300 rounded-md focus:outline-none focus:ring-0.5 focus:ring-[#BBC2F8] focus:border-[#BBC2F8] text-gray-900"
              />
            </div>

            {/* Category Field */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <input
                type="text"
                name="navbarCategory"
                value={formData.navbarCategory?.name || formData.navbarCategory}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#FDFDFF] border border-gray-300 rounded-md focus:outline-none focus:ring-0.5 focus:ring-[#BBC2F8] focus:border-[#BBC2F8] text-gray-900"
              />
            </div> */}

            {/* Subcategory Field */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
              <input
                type="text"
                name="navbarSubCategory"
                value={formData.navbarSubCategory?.name || formData.navbarSubCategory}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#FDFDFF] border border-gray-300 rounded-md focus:outline-none focus:ring-0.5 focus:ring-[#BBC2F8] focus:border-[#BBC2F8] text-gray-900"
              />
            </div> */}

            {/* Subcategory Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory Name</label>
              <input
                type="text"
                name="subcategoryName"
                value={formData.subcategoryName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#FDFDFF] border border-gray-300 rounded-md focus:outline-none focus:ring-0.5 focus:ring-[#BBC2F8] focus:border-[#BBC2F8] text-gray-900"
              />
            </div>

            {/* Subcategory Slug Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory Slug</label>
              <input
                type="text"
                name="subcategorySlug"
                value={formData.subcategorySlug}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#FDFDFF] border border-gray-300 rounded-md focus:outline-none focus:ring-0.5 focus:ring-[#BBC2F8] focus:border-[#BBC2F8] text-gray-900"
              />
            </div>

            {/* Status Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <div className="relative">
                <select
                  name="status"
                  value={formData.status ? "Active" : "Inactive"}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-[#FDFDFF] border border-gray-300 rounded-md focus:outline-none focus:ring-0.5 focus:ring-[#BBC2F8] focus:border-[#BBC2F8] text-gray-900 appearance-none pr-8"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Deleted At Field */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deleted At</label>
              <input
                type="text"
                name="deletedAt"
                value={formData.deletedAt || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#FDFDFF] border border-gray-300 rounded-md focus:outline-none focus:ring-0.5 focus:ring-[#BBC2F8] focus:border-[#BBC2F8] text-gray-900"
                disabled
              />
            </div> */}

            {/* Dynamic Data Fields */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data (Dynamic)</label>
              {formData.data && Object.keys(formData.data).length > 0 ? (
                Object.entries(formData.data).map(([key, val]) => (
                  <div key={key} className="mb-2">
                    <label className="text-xs text-gray-500">{key}</label>
                    <input
                      type="text"
                      name={key}
                      value={val}
                      onChange={handleDataChange}
                      className="w-full px-2 py-1 bg-[#FDFDFF] border border-gray-300 rounded-md focus:outline-none focus:ring-0.5 focus:ring-[#BBC2F8] focus:border-[#BBC2F8] text-gray-900"
                    />
                  </div>
                ))
              ) : (
                <div className="text-xs text-gray-400">No dynamic data fields</div>
              )}
            </div> */}

            {/* SEO Fields (optional) */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SEO (optional)</label>
              <input
                type="text"
                name="seo"
                value={formData.seo?.title || ""}
                onChange={e => setFormData(prev => ({ ...prev, seo: { ...prev.seo, title: e.target.value } }))}
                className="w-full px-3 py-2 mb-2 bg-[#FDFDFF] border border-gray-300 rounded-md focus:outline-none focus:ring-0.5 focus:ring-[#BBC2F8] focus:border-[#BBC2F8] text-gray-900"
                placeholder="SEO Title"
              />
              <input
                type="text"
                name="seoDesc"
                value={formData.seo?.description || ""}
                onChange={e => setFormData(prev => ({ ...prev, seo: { ...prev.seo, description: e.target.value } }))}
                className="w-full px-3 py-2 bg-[#FDFDFF] border border-gray-300 rounded-md focus:outline-none focus:ring-0.5 focus:ring-[#BBC2F8] focus:border-[#BBC2F8] text-gray-900"
                placeholder="SEO Description"
              />
            </div> */}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleUpdate}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={loading}
              >
                Update
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
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
