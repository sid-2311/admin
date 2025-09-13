import React, { useState } from "react";
import { FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import StatusToggle from "../ui/ToggleButton";
import { useNavigate } from "react-router-dom";

// StatusToggle component

const BlogCategory = () => {
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate =useNavigate()

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

  const totalPages = Math.ceil(filteredData.length / entries);
  const startIdx = (currentPage - 1) * entries;
  const endIdx = startIdx + entries;
  const paginatedData = filteredData.slice(startIdx, endIdx);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Reset page to 1 when search or entries change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, entries]);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };

const handleEdit = (item) => {
  navigate("/editblog", {
    state: { editData: item }
  });
};

const handleNew=()=>{
    navigate("/createBlog")
}
  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-10">
      {/* Top Actions */}
      <div className="flex justify-between items-center mb-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700" onClick={handleNew}>
          + Add New
        </button>

        <div className="flex items-center gap-2">
          <label className="text-sm">Show</label>
          <select
            value={entries}
            onChange={(e) => setEntries(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
          <span className="text-sm">entries</span>
        </div>

        <div>
          <input
            type="text"
            placeholder="Search..."
            className="border px-3 py-1 rounded text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold">
              <th className="px-4 py-2">SN</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Slug</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr
                key={item.id}
                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 text-sm"
              >
                <td className="px-4 py-2">{startIdx + index + 1}</td>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2 text-gray-500">{item.slug}</td>
                <td className="px-4 py-2">
                  <StatusToggle initialStatus={item.status} />
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button onClick={() => handleEdit(item)}  className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">
                    <FaEdit size={14} />
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                    <FaTrash size={14} />
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {startIdx + 1} to {Math.min(endIdx, filteredData.length)} of {filteredData.length} entries
            </div>
            
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded text-sm ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white border text-gray-700 hover:bg-gray-50"
                }`}
              >
                <FaChevronLeft size={12} />
              </button>

              {/* Page Numbers */}
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded text-sm ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "bg-white border text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded text-sm ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white border text-gray-700 hover:bg-gray-50"
                }`}
              >
                <FaChevronRight size={12} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCategory;