import React, { useState } from "react";

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "admin@gmail.com",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Profile updated!");
  };

  return (
    <div className="flex items-center p-10 bg-gray-100">
      <div className="bg-white  p-10    w-full max-w-lg ">
        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://via.placeholder.com/100"
            alt="profile"
            className="w-24 h-24 rounded-full object-cover mb-3"
          />
          <input
            type="file"
            className="block text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-0.2 border-[#E4E6FC]  bg-[#FDFDFF] rounded-md p-2 focus:outline-none focus:ring-0.5 focus:ring-offset-purple-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#FDFDFF] border border-0.2 border-[#E4E6FC] rounded-md p-2 focus:outline-none focus:ring-0.5 focus:ring-offset-purple-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-0.2 border-[#E4E6FC] bg-[#FDFDFF] rounded-md p-2 focus:outline-none focus:ring-0.5 focus:ring-offset-purple-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-0.2 border-[#E4E6FC] bg-[#FDFDFF] rounded-md p-2 focus:outline-none focus:ring-0.5 focus:ring-offset-purple-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md shadow hover:bg-blue-700 transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
