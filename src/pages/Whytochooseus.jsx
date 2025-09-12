import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const Whytochoose = () => {
  const [formData, setFormData] = useState({
    title: "There Some Reasons to Hire The Proeasy",
    description:
      "We are dedicated to work with all dynamic features like Laravel, customized website, PHP, SEO, etc. We believe on just in time. We provide all web solutions accordingly and ensure the best service. We rely on new creation and the best management policy. We usually monitor the market and policies.",
    backgroundImage: null,
    foregroundImage: null,
    itemOne: "Top-Rated Company",
    descOne:
      "We offer low-cost services and cutting-edge technologies to help you improve your application and bring more value to your consumers",
    itemTwo: "Superior Quality",
    descTwo:
      "We assist enterprises to decrease the risk of security events across the SDLC and launch internet solutions with protection.",
    itemThree: "Friendly Provide Services",
    descThree:
      "We assist our customers to determine the right way for them and provide business eLearning solutions.",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleEditorChange = (content) => {
    setFormData({ ...formData, description: content });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Form Submitted!");
  };

  return (
    <form
      className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow"
      onSubmit={handleSubmit}
    >
      {/* Title */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Description</label>
       <Editor
      apiKey='acjhcofsnudxw7zfd6fkotrfg8uh0mhxfzzgrhfxyop95vll'
      init={{
        plugins: [
          // Core editing features
          'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
          // Your account includes a free trial of TinyMCE premium features
          // Try the most popular premium features until Sep 25, 2025:
          'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'advtemplate', 'ai', 'uploadcare', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
        ],
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
        uploadcare_public_key: 'b981648c6e382093adad',
      }}
      initialValue="Welcome to TinyMCE!"
    />
      </div>

      {/* Background Image */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Background Image</label>
        {formData.backgroundImage && (
          <img
            src={URL.createObjectURL(formData.backgroundImage)}
            alt="Background Preview"
            className="h-28 w-auto mb-2 rounded"
          />
        )}
        <input type="file" name="backgroundImage" onChange={handleChange} />
      </div>

      {/* Foreground Image */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Foreground Image</label>
        {formData.foregroundImage && (
          <img
            src={URL.createObjectURL(formData.foregroundImage)}
            alt="Foreground Preview"
            className="h-28 w-auto mb-2 rounded"
          />
        )}
        <input type="file" name="foregroundImage" onChange={handleChange} />
      </div>

      {/* Item One */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Item One</label>
        <input
          type="text"
          name="itemOne"
          value={formData.itemOne}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
        />
        <textarea
          name="descOne"
          value={formData.descOne}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={3}
        />
      </div>

      {/* Item Two */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Item Two</label>
        <input
          type="text"
          name="itemTwo"
          value={formData.itemTwo}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
        />
        <textarea
          name="descTwo"
          value={formData.descTwo}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={3}
        />
      </div>

      {/* Item Three */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Item Three</label>
        <input
          type="text"
          name="itemThree"
          value={formData.itemThree}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
        />
        <textarea
          name="descThree"
          value={formData.descThree}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={3}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        Update
      </button>
    </form>
  );
};

export default Whytochoose;
