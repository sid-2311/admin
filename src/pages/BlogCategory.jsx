import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import StatusToggle from "../ui/ToggleButton";
import { useNavigate } from "react-router-dom";

const BlogCategory = () => {
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const data = [
    { id: 1, name: "Home Cleaning", slug: "home-cleaning", status: "Active" },
    { id: 2, name: "Painting & Renovation", slug: "painting-renovation", status: "Active" },
    { id: 3, name: "Cleaning & Pest Control", slug: "cleaning-pest-control", status: "Active" },
    { id: 4, name: "Emergency Services", slug: "emergency-services", status: "Active" },
    { id: 5, name: "Car Care Services", slug: "car-care-services", status: "Active" },
    { id: 6, name: "Electric & Plumbing", slug: "electric-plumbing", status: "Active" },
    { id: 7, name: "Home Move", slug: "home-move", status: "Active" },
    { id: 8, name: "Gardening Services", slug: "gardening-services", status: "Active" },
    { id: 9, name: "Pest Management", slug: "pest-management", status: "Active" },
    { id: 10, name: "Security Services", slug: "security-services", status: "Active" },
    { id: 11, name: "IT Support", slug: "it-support", status: "Active" },
    { id: 12, name: "Digital Marketing", slug: "digital-marketing", status: "Active" },
    { id: 13, name: "Content Writing", slug: "content-writing", status: "Active" },
    { id: 14, name: "Graphic Design", slug: "graphic-design", status: "Active" },
    { id: 15, name: "Web Development", slug: "web-development", status: "Active" },
    { id: 16, name: "Mobile App Development", slug: "mobile-app-development", status: "Active" },
    { id: 17, name: "SEO Optimization", slug: "seo-optimization", status: "Active" },
    { id: 18, name: "Photography", slug: "photography", status: "Active" },
    { id: 19, name: "Videography", slug: "videography", status: "Active" },
    { id: 20, name: "Event Management", slug: "event-management", status: "Active" },
    { id: 21, name: "Catering Services", slug: "catering-services", status: "Active" },
    { id: 22, name: "Travel & Tourism", slug: "travel-tourism", status: "Active" },
    { id: 23, name: "Education & Training", slug: "education-training", status: "Active" },
    { id: 24, name: "Healthcare Services", slug: "healthcare-services", status: "Active" },
    { id: 25, name: "Fitness & Gym", slug: "fitness-gym", status: "Active" }
  ];

  // Filter by search
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.slug.toLowerCase().includes(search.toLowerCase())
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

  const handleEdit = (item) => {
    navigate("/editblog", { state: { editData: item } });
  };

  const handleNew = () => {
    navigate("/createBlog");
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [entries, search]);

  return (
    <div className="p-6 bg-gray-100">
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
      <div className="bg-white p-4  ">
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
              <th className="p-3">Name</th>
              <th className="p-3">Slug</th>
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
                  {item.name}
                </td>
                <td className="p-3">{item.slug}</td>
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

            {filteredData.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No records found
                </td>
              </tr>
            )}
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

export default BlogCategory;
