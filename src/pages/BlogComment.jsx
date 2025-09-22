import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import StatusToggle from "../ui/ToggleButton";

export default function BlogComment() {
  // ✅ State
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Table data ko state me rakha
  const [tableData, setTableData] = useState([
    {
      id: 1,
      name: "David Simmons",
      email: "simmons@gmail.com",
      comment:
        "Per ex vero nonumy. Ius eu doming nominavi mediocrem, aliquid efficiantur no vim, sanctus admodum mnesarchum ad pro. No sea invidunt",
      blog: "view",
      status: "Active",
    },
    {
      id: 2,
      name: "David Richard",
      email: "david@gmail.com",
      comment:
        "Appetere fabellas ius te. Nonumes splendide deseruisse ea vis, alii velit vel eu. Eos ut scaevola platonem rationibus vis natum vivendo.",
      blog: "view",
      status: "Active",
    },
    // 👇 baki data same hai
  ]);

  // 🔎 Search filter
  const filteredData = tableData.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 📄 Pagination logic
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  // 🗑️ Delete row
  const handleDelete = (id) => {
    setTableData((prev) => prev.filter((row) => row.id !== id));
  };

  // 🔄 Toggle status update
  const handleStatusChange = (id, newStatus) => {
    setTableData((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, status: newStatus } : row
      )
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Show</span>
            <input
              type="number"
              className="border text-gray-600 border-gray-400 rounded bg-[#FDFDFF] p-1 w-16 text-center focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              min="1"
            />
            <span className="text-gray-600">entries</span>
          </div>

          <div className="flex items-center gap-2 text-sm w-full sm:w-auto">
            <span className="text-gray-600 whitespace-nowrap">Search:</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="flex-1 sm:flex-none border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  SN
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Comment
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Blog
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentEntries.map((row) => (
                <tr
                  key={row.id}
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 text-xs sm:text-sm"
                >
                  <td className="px-4 py-3">{row.id}</td>
                  <td className="px-4 py-3">{row.name}</td>
                  <td className="px-4 py-3 break-words text-blue-600">
                    {row.email}
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <div className="truncate">{row.comment}</div>
                  </td>
                  <td className="px-4 py-3">
                    <button className="inline-flex px-3 py-1 text-xs font-medium bg-blue-500 rounded text-white">
                      {row.blog}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <StatusToggle
                      initialStatus={row.status}
                      onToggle={(newStatus) =>
                        handleStatusChange(row.id, newStatus)
                      }
                    />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="bg-red-500 text-white p-2 rounded"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {currentEntries.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-4 py-4 border-t border-gray-200 text-sm">
          <div className="text-gray-600">
            Showing {filteredData.length === 0 ? 0 : indexOfFirstEntry + 1} to{" "}
            {Math.min(indexOfLastEntry, filteredData.length)} of{" "}
            {filteredData.length} entries
          </div>

          <div className="flex flex-wrap items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-xs sm:text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 text-xs sm:text-sm rounded ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-xs sm:text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
