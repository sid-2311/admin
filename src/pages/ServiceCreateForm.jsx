import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createService, checkSlugExists } from "../api/api";
import { useDispatch, useSelector } from 'react-redux';
import { loadNavbars } from '../store/navbarSlice';
import DynamicDataEditor from "../components/DynamicDataEditor";
import SeoForm from "../components/SeoForm";

// EN: Service creation form with category, subcategory and SEO management
// HI: Service बनाने का फॉर्म जिसमें category, subcategory और SEO का प्रबंधन है
const ServiceCreateForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navbarState = useSelector(s => s.navbar);
  
  // EN: Local state management
  // HI: लोकल स्टेट मैनेजमेंट
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [isNewSubcategory, setIsNewSubcategory] = useState(false);
  const [slugError, setSlugError] = useState("");
  const [loading, setLoading] = useState(false);

  // EN: Main form data state with SEO fields
  // HI: मुख्य फॉर्म डेटा स्टेट SEO फील्ड्स के साथ
  const [formData, setFormData] = useState({
    serviceType: "",
    navbarCategory: "",
    navbarSubCategory: "",
    subcategoryName: "",
    subcategorySlug: "",
    slug: "",
    data: {},
    seo: {
      title: "",
      description: "",
      canonical: "",
      openGraph: {
        title: "",
        description: "",
        url: "",
        type: "website",
        images: [{
          url: "",
          width: 1200,
          height: 630,
          alt: ""
        }]
      }
    },
    status: true,
  });

  // EN: States for new category/subcategory creation
  // HI: नई category/subcategory बनाने के लिए स्टेट्स
  const [newCategoryData, setNewCategoryData] = useState({
    name: "",
    slug: "",
    index: 0
  });

  const [newSubcategoryData, setNewSubcategoryData] = useState({
    name: "",
    slug: "",
    index: 0
  });

  // EN: Load categories from navbar state
  // HI: Navbar स्टेट से categories लोड करें
  useEffect(() => {
    if (navbarState.data) {
      setCategories(navbarState.data);
    }
  }, [navbarState.data]);

  // EN: Load navbars if not already loaded
  // HI: अगर navbars लोड नहीं हैं तो लोड करें
  useEffect(() => {
    if (!navbarState.data?.length && !navbarState.loading) {
      dispatch(loadNavbars());
    }
  }, [dispatch, navbarState.data?.length, navbarState.loading]);

  // EN: Update subcategories when category changes
  // HI: Category बदलने पर subcategories अपडेट करें
  useEffect(() => {
    if (!isNewCategory) {
      const cat = categories.find(c => c._id === formData.navbarCategory);
      setSubcategories(cat?.subcategories || []);
    }
  }, [formData.navbarCategory, categories, isNewCategory]);

  // EN: Handle slug change and check uniqueness
  // HI: Slug के बदलाव को हैंडल करें और यूनीक चेक करें
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

  // EN: Handle form field changes
  // HI: फॉर्म फील्ड्स के बदलाव को हैंडल करें
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // EN: Handle form submission
  // HI: फॉर्म सबमिशन को हैंडल करें
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (slugError) return;
    setLoading(true);

    try {
      const submitData = { ...formData };
      
      if (isNewCategory) {
        submitData.navbarCategory = newCategoryData;
      }

      if (isNewSubcategory) {
        submitData.navbarSubCategory = newSubcategoryData;
      }

      await createService(submitData);
      navigate("/services");
    } catch (err) {
      alert("Error creating service: " + err.message);
    }
    
    setLoading(false);
  };

  console.log("formdata", formData);
  

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border">
      <h2 className="text-xl font-bold mb-4 text-indigo-600">Create New Service</h2>
      
      {/* EN: Category Selection */}
      {/* HI: Category का चयन */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Category</label>
        <div className="flex items-center gap-2 mb-2">
          <select
            name="navbarCategory"
            value={formData.navbarCategory}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            disabled={isNewCategory}
            required={!isNewCategory}
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setIsNewCategory(!isNewCategory)}
            className="px-3 py-2 bg-blue-100 rounded text-sm"
          >
            {isNewCategory ? 'Select Existing' : 'Add New'}
          </button>
        </div>

        {isNewCategory && (
          <div className="grid grid-cols-2 gap-4 p-4 border rounded bg-gray-50">
            <div>
              <label className="block mb-1 text-sm">Category Name</label>
              <input
                type="text"
                value={newCategoryData.name}
                onChange={(e) => setNewCategoryData(prev => ({...prev, name: e.target.value}))}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Category Slug</label>
              <input
                type="text"
                value={newCategoryData.slug}
                onChange={(e) => setNewCategoryData(prev => ({...prev, slug: e.target.value}))}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          </div>
        )}
      </div>

      {/* EN: Subcategory Selection */}
      {/* HI: Subcategory का चयन */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Subcategory</label>
        <div className="flex items-center gap-2 mb-2">
          <select
            name="navbarSubCategory"
            value={formData.navbarSubCategory}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            disabled={isNewSubcategory || isNewCategory}
            required={!isNewSubcategory}
          >
            <option value="">Select Subcategory</option>
            {subcategories.map(sub => (
              <option key={sub._id} value={sub._id}>{sub.name}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setIsNewSubcategory(!isNewSubcategory)}
            className="px-3 py-2 bg-blue-100 rounded text-sm"
            disabled={isNewCategory}
          >
            {isNewSubcategory ? 'Select Existing' : 'Add New'}
          </button>
        </div>

        {isNewSubcategory && (
          <div className="grid grid-cols-2 gap-4 p-4 border rounded bg-gray-50">
            <div>
              <label className="block mb-1 text-sm">Subcategory Name</label>
              <input
                type="text"
                value={newSubcategoryData.name}
                onChange={(e) => setNewSubcategoryData(prev => ({...prev, name: e.target.value}))}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Subcategory Slug</label>
              <input
                type="text"
                value={newSubcategoryData.slug}
                onChange={(e) => setNewSubcategoryData(prev => ({...prev, slug: e.target.value}))}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          </div>
        )}
      </div>

      {/* EN: Basic Fields */}
      {/* HI: मूल फील्ड्स */}
      <div className="space-y-4">
        <div>
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

        <div>
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

        <div>
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
      </div>

      {/* EN: SEO Form Component */}
      {/* HI: SEO फॉर्म कंपोनेंट */}
      <div className="mt-8 border-t pt-4">
        <SeoForm 
          seo={formData.seo}
          onChange={(newSeo) => setFormData(prev => ({ ...prev, seo: newSeo }))}
        />
      </div>

      {/* EN: Dynamic Data Editor */}
      {/* HI: डायनामिक डेटा एडिटर */}
      <div className="mt-8 border-t pt-4">
        <DynamicDataEditor 
          data={formData.data} 
          setData={newData => setFormData(prev => ({ ...prev, data: newData }))} 
        />
      </div>

      {/* EN: Submit Button */}
      {/* HI: सबमिट बटन */}
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={loading || !!slugError}
          className="bg-indigo-600 text-white px-6 py-2 rounded font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Service"}
        </button>
      </div>
    </form>
  );
};

export default ServiceCreateForm;