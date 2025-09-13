import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate, useLocation } from "react-router-dom";

const BlogEditForm = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [homepage, setHomepage] = useState("No");
  const [status, setStatus] = useState("Active");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get editData from Blogs component
  const editData = location.state?.editData;

  // ✅ Pre-fill form when editData is available
  useEffect(() => {
    if (editData) {
      setTitle(editData.title || "");
      setSlug(
        editData.slug ||
          editData.title?.toLowerCase().replace(/\s+/g, "-") ||
          ""
      );
      setCategory(editData.category || "");
      setDescription(editData.description || "");
      setHomepage(editData.homepage || "No");
      setStatus(editData.status || "Active");
      setSeoTitle(editData.seoTitle || "");
      setSeoDesc(editData.seoDesc || "");
      setThumbnail(editData.image || null);
    }
  }, [editData]);

  const handleThumbnail = (e) => {
    setThumbnail(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogData = {
      title,
      slug,
      category,
      description,
      homepage,
      status,
      seoTitle,
      seoDesc,
      thumbnail,
    };
    console.log("Updated Blog Data:", blogData);
    alert("Blog Updated!");
    navigate(-1); // Go back after saving
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Back Button OUTSIDE */}
      <div className="w-full mb-4">
        <div className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md font-medium text-sm cursor-pointer" onClick={handleCancel}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Blogs 
            </div>
      </div>

      {/* Form Card */}
      <div className="mx-auto bg-white p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Thumbnail */}
          <div>
            <label className="block font-medium mb-2">
              Thumbnail Image Preview
            </label>
            <div className="flex items-center space-x-4">
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt="preview"
                  className="w-32 h-32 object-cover border rounded-md"
                />
              ) : (
                <div className="w-32 h-32 border rounded-md flex items-center justify-center text-gray-400">
                  <span>No Image</span>
                </div>
              )}
              <div>
                <input
                  type="file"
                  onChange={handleThumbnail}
                  className="block w-full text-sm text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block font-medium mb-2">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
              }}
              className="w-full px-4 py-3 bg-[#FDFDFF] border border-gray-300 rounded-md focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
              placeholder="Enter blog title"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block font-medium mb-2">Slug *</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-3 bg-[#FDFDFF] border border-gray-300 rounded-md focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
              placeholder="auto-generated or enter manually"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-2">Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-[#FDFDFF] border border-gray-300 rounded-md focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
              required
            >
              <option value="">Select Category</option>
              <option value="Car Care Services">Car Care Services</option>
              <option value="Home Move">Home Move</option>
              <option value="Electric & Plumbing">Electric & Plumbing</option>
              <option value="Home Cleaning">Home Cleaning</option>
              <option value="General Services">General Services</option>
              <option value="tech">Tech</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="news">News</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-2">Description *</label>
            <Editor
              apiKey="acjhcofsnudxw7zfd6fkotrfg8uh0mhxfzzgrhfxyop95vll"
              init={{
                height: 300,
                menubar: true,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | \
                   alignleft aligncenter alignright alignjustify | \
                   bullist numlist outdent indent | removeformat | help",
              }}
              value={description}
              onEditorChange={(newValue) => setDescription(newValue)}
            />
          </div>

          {/* Show Homepage */}
          <div>
            <label className="block font-medium mb-2">Show Homepage? *</label>
            <select
              value={homepage}
              onChange={(e) => setHomepage(e.target.value)}
              className="w-full px-4 py-3 bg-[#FDFDFF] border border-gray-300 rounded-md focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block font-medium mb-2">Status *</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 bg-[#FDFDFF] border border-gray-300 rounded-md focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          {/* SEO Title */}
          <div>
            <label className="block font-medium mb-2">SEO Title</label>
            <input
              type="text"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              className="w-full px-4 py-3 bg-[#FDFDFF] border border-gray-300 rounded-md focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
              placeholder="Enter SEO title"
            />
          </div>

          {/* SEO Description */}
          <div>
            <label className="block font-medium mb-2">SEO Description</label>
            <textarea
              value={seoDesc}
              onChange={(e) => setSeoDesc(e.target.value)}
              className="w-full px-4 py-3 bg-[#FDFDFF] border border-gray-300 rounded-md focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
              placeholder="Enter SEO description"
              rows={3}
            />
          </div>

          {/* Save Button */}
          <div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogEditForm;
