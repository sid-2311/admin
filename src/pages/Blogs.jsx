import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import StatusToggle from "../ui/ToggleButton";
import { useNavigate } from "react-router-dom";

const data = [
  {
    id: 1,
    title: "Now Get Massage Service with our lovely team",
    category: "Car Care Services",
    image: "https://via.placeholder.com/50",
    homepage: "No",
    status: "Active",
    description: "This is a dummy description for Massage Service.",
    seoTitle: "Massage Service - Car Care Experts",
    seoDesc: "Get the best massage service for your car with our expert team.",
  },
  {
    id: 2,
    title: "Home Move Service From One City to Another City",
    category: "Home Move",
    image: "https://via.placeholder.com/50",
    homepage: "No",
    status: "Active",
    description: "This is a dummy description for Home Move Service.",
    seoTitle: "Home Moving Services - Relocation Made Easy",
    seoDesc: "Reliable home moving service from one city to another city.",
  },
  {
    id: 3,
    title: "Switchboard an a electrical connecting cable.",
    category: "Electric & Plumbing",
    image: "https://via.placeholder.com/50",
    homepage: "Yes",
    status: "Active",
    description: "This is a dummy description for Electric & Plumbing service.",
    seoTitle: "Electric & Plumbing Services - Switchboard & Wiring",
    seoDesc: "Professional electric and plumbing solutions with safe connections.",
  },
  {
    id: 4,
    title: "Spry and disinfection of office and home to prevent",
    category: "Home Cleaning",
    image: "https://via.placeholder.com/50",
    homepage: "Yes",
    status: "Active",
    description: "This is a dummy description for Home Cleaning service.",
    seoTitle: "Home & Office Cleaning Services",
    seoDesc: "Effective spray and disinfection services for homes and offices.",
  },
  // Extra dummy records
  ...Array.from({ length: 21 }, (_, i) => ({
    id: i + 5,
    title: `Dummy Service Title ${i + 5}`,
    category: "General Services",
    image: "https://via.placeholder.com/50",
    homepage: i % 2 === 0 ? "Yes" : "No",
    status: "Active",
    description: `This is a dummy description for Dummy Service Title ${i + 5}.`,
    seoTitle: `SEO Title for Dummy Service Title ${i + 5}`,
    seoDesc: `This is a dummy SEO description for Dummy Service Title ${i + 5}.`,
  })),
];

const Blogs = () => {
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  // Filtered Data
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const paginatedData = filteredData.slice(startIndex, startIndex + entries);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleNew = () => {
    navigate("/BlogCreate");
  };

  const handleEdit = (item) => {
    navigate("/BlogEdit", {
      state: { editData: item },
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700"
          onClick={handleNew}
        >
          + Add New
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white p-4 ">
        {/* Show entries + Search bar row */}
        <div className="flex justify-between items-center mb-4">
          {/* Left side - Show entries */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <input
              type="number"
              min="1"
              value={entries}
              onChange={(e) => {
                const val = Number(e.target.value);
                setEntries(val > 0 ? val : 1);
                setCurrentPage(1);
              }}
              className="border text-gray-400 border-gray-400 rounded bg-[#FDFDFF] p-1 w-16 text-center focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
            />
            <span className="text-sm text-gray-600">entries</span>
          </div>

          {/* Right side - Search */}
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <span>Search:</span>
            <input
              type="text"
              className="border border-gray-400 rounded focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">SN</th>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Image</th>
              <th className="p-3">Show Homepage</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr
                key={item.id}
                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 text-sm"
              >
                <td className="p-3">{startIndex + index + 1}</td>
                <td className="p-3 text-blue-600 cursor-pointer">
                  {item.title}
                </td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="p-3">
                  {item.homepage === "Yes" ? (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                      Yes
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                      No
                    </span>
                  )}
                </td>
                <td className="p-3">
                  <StatusToggle initialStatus={item.status} />
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    className="bg-blue-600 p-2 rounded text-white hover:bg-blue-700"
                    onClick={() => handleEdit(item)}
                  >
                    <FaEdit />
                  </button>
                  <button className="bg-red-600 p-2 rounded text-white hover:bg-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-end mt-4">
          <nav className="flex items-center space-x-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded ${
                currentPage === 1
                  ? "text-gray-400 border-gray-300"
                  : "text-blue-600 border-blue-400 hover:bg-blue-50"
              }`}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white border-blue-600"
                    : "text-blue-600 border-blue-400 hover:bg-blue-50"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border rounded ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-300"
                  : "text-blue-600 border-blue-400 hover:bg-blue-50"
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
