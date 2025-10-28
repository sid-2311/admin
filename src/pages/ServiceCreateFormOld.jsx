import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createService, checkSlugExists } from "../api/api";
import { useDispatch, useSelector } from 'react-redux';
import { loadNavbars } from '../store/navbarSlice';
import DynamicDataEditor from "../components/DynamicDataEditor";
const ServiceCreateFormOld = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [formData, setFormData] = useState({
    serviceType: "",
    navbarCategory: "",
    navbarSubCategory: "",
    subcategoryName: "",
    subcategorySlug: "",
    slug: "",
    data: {},
    seo: {},
    status: true,
  });
  const [slugError, setSlugError] = useState("");
  const [loading, setLoading] = useState(false);

      const dispatch = useDispatch();
      const navbarState = useSelector(s => s.navbar);
     

      useEffect(() => {
        if (navbarState.data) {
          setCategories(navbarState.data);
        }
        }, [navbarState.data]);
      
      

  // Fetch categories for dropdown
   // load navbars once
    useEffect(() => {
        if (!navbarState.data?.length && !navbarState.loading) {
            dispatch(loadNavbars());
           
            
        }
    }, [dispatch, navbarState.data?.length, navbarState.loading]);

    console.log(navbarState.data);
    console.log("categories", categories);
    
    


  // Fetch subcategories when category changes
  useEffect(() => {
    const cat = categories.find(c => c._id === formData.navbarCategory);
    setSubcategories(cat?.subcategories || []);
  }, [formData.navbarCategory, categories]);

  // Slug uniqueness check
  const handleSlugChange = async (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, slug: value }));
    if (value) {
      const exists = await checkSlugExists(value);
      setSlugError(exists ? "Slug already exists" : "");
    } else {
      setSlugError("");
    }
  };

  // Handle other input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle dynamic data fields (example for heading/description)
  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      data: { ...prev.data, [name]: value }
    }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (slugError) return;
    setLoading(true);
    try {
      await createService(formData);
      navigate("/services");
    } catch (err) {
      alert("Error creating service");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border">
      <h2 className="text-xl font-bold mb-4 text-indigo-600">Create New Service</h2>
      {/* Category Dropdown */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Category</label>
        <select
          name="navbarCategory"
          value={formData.navbarCategory}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>
      {/* Subcategory Dropdown */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Subcategory</label>
        <select
          name="navbarSubCategory"
          value={formData.navbarSubCategory}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="">Select Subcategory</option>
          {subcategories.map(sub => (
            <option key={sub._id} value={sub._id}>{sub.name}</option>
          ))}
        </select>
      </div>
      {/* Slug Input */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Slug</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleSlugChange}
          className="w-full border rounded px-3 py-2"
          required
        />
        {slugError && <span className="text-red-500 text-xs">{slugError}</span>}
      </div>
      {/* Service Type */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Service Type</label>
        <input
          type="text"
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      {/* Subcategory Name/Slug */}
      <div className="mb-4 flex gap-2">
        <div className="flex-1">
          <label className="block mb-1 font-medium">Subcategory Name</label>
          <input
            type="text"
            name="subcategoryName"
            value={formData.subcategoryName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block mb-1 font-medium">Subcategory Slug</label>
          <input
            type="text"
            name="subcategorySlug"
            value={formData.subcategorySlug}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
      </div>
      {/* Status */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={e => setFormData(prev => ({ ...prev, status: e.target.value === "true" }))}
          className="w-full border rounded px-3 py-2"
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>
      {/* Dynamic Data Fields */}

      <DynamicDataEditor data={formData.data} setData={newData => setFormData(prev => ({ ...prev, data: newData }))} />
      {/* SEO Fields */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">SEO Title</label>
        <input
          type="text"
          name="seoTitle"
          value={formData.seo.title || ""}
          onChange={e => setFormData(prev => ({
              ...prev,
              seo: { ...prev.seo, title: e.target.value }
          }))}
          className="w-full border rounded px-3 py-2"
        />
        {/* Add more SEO fields as needed */}
      </div>
      <button
        type="submit"
        disabled={loading || !!slugError}
        className="bg-indigo-600 text-white px-6 py-2 rounded font-semibold hover:bg-indigo-700 transition"
      >
        {loading ? "Creating..." : "Create Service"}
      </button>
    </form>
  );
};
            //   <div className="mb-4">
            //     <label className="block mb-1 font-medium">Heading</label>
            //     <input
            //       type="text"
            //       name="heading"
            //       value={formData.data.heading || ""}
            //       onChange={handleDataChange}
            //       className="w-full border rounded px-3 py-2"
            //     />
            //     <label className="block mb-1 font-medium mt-2">Description</label>
            //     <textarea
            //       name="description"
            //       value={formData.data.description || ""}
            //       onChange={handleDataChange}
            //       className="w-full border rounded px-3 py-2"
            //     />
            //     {/* Add more dynamic fields as needed */}
            //   </div>

export default ServiceCreateFormOld;