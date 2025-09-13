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
    comment: "Per ex vero nonumy. Ius eu doming nominavi mediocrem, aliquid efficiantur no vim, sanctus admodum mnesarchum ad pro. No sea invidunt",
    blog: "view",
    status: "Active"
  },
  {
    id: 2,
    name: "David Richard",
    email: "david@gmail.com",
    comment: "Appetere fabellas ius te. Nonumes splendide deseruisse ea vis, alii velit vel eu. Eos ut scaevola platonem rationibus vis natum vivendo.",
    blog: "view",
    status: "Active"
  },
  {
    id: 3,
    name: "John Doe",
    email: "john@gmail.com",
    comment: "Appetere fabellas ius te. Nonumes splendide deseruisse ea vis, alii velit vel eu. Eos ut scaevola platonem rationibus. Vis natum vivendo",
    blog: "view",
    status: "Inactive"
  },
  {
    id: 4,
    name: "David Richard",
    email: "user@gmail.com",
    comment: "Id est maiorum volutpat, ad nominavi suscipit suscipiantur vix. Ut ius veri aperiam reprehendunt. Ut per unum sapientem consequuntur",
    blog: "view",
    status: "Active"
  },
  {
    id: 5,
    name: "Alice Johnson",
    email: "alice.johnson@gmail.com",
    comment: "Mea eu invidunt volutpat, rebum sententiae conclusionemque et eos. Has an diam offendit.",
    blog: "view",
    status: "Active"
  },
  {
    id: 6,
    name: "Robert Brown",
    email: "robert.brown@gmail.com",
    comment: "Vel modo ornatus appetere id, eu falli primis iracundia nec, eos cu epicuri molestiae.",
    blog: "view",
    status: "Inactive"
  },
  {
    id: 7,
    name: "Emily Davis",
    email: "emily.davis@gmail.com",
    comment: "Ut aliquip delenit conclusionemque pri, mei no vivendo sententiae, ut pro liber prompta.",
    blog: "view",
    status: "Active"
  },
  {
    id: 8,
    name: "Michael Scott",
    email: "michael.scott@dundermifflin.com",
    comment: "Vim at partem vivendo, his no maiorum repudiandae. Vim aliquip labores perfecto ei.",
    blog: "view",
    status: "Inactive"
  },
  {
    id: 9,
    name: "Jessica Miller",
    email: "jessica.miller@gmail.com",
    comment: "Eum alterum pertinacia cu, simul timeam vis eu. Quo et modo corrumpit, dictas placerat ea vis.",
    blog: "view",
    status: "Active"
  },
  {
    id: 10,
    name: "Chris Evans",
    email: "chris.evans@gmail.com",
    comment: "At nec mucius postulant. Vim idque patrioque in, everti dolores ne cum.",
    blog: "view",
    status: "Active"
  },
  {
    id: 11,
    name: "Sophia Wilson",
    email: "sophia.wilson@gmail.com",
    comment: "Ut labores disputando cum. Eos ea aliquid incorrupte, putent essent maiorum ea pro.",
    blog: "view",
    status: "Inactive"
  },
  {
    id: 12,
    name: "Daniel Martinez",
    email: "daniel.martinez@gmail.com",
    comment: "Usu brute efficiantur cu, no vim solum persequeris. Ius ea dolor dissentias.",
    blog: "view",
    status: "Active"
  },
  {
    id: 13,
    name: "Olivia Anderson",
    email: "olivia.anderson@gmail.com",
    comment: "Id est liber iuvaret, at cum laudem possim. At cibo mollis intellegebat mea.",
    blog: "view",
    status: "Active"
  },
  {
    id: 14,
    name: "James Taylor",
    email: "james.taylor@gmail.com",
    comment: "Te mei solum altera, vel ea meis altera, te eum amet case. Qui tale illud cu.",
    blog: "view",
    status: "Inactive"
  },
  {
    id: 15,
    name: "Emma Thomas",
    email: "emma.thomas@gmail.com",
    comment: "Exerci partem liberavisse ad vis, ne mel fugit sadipscing. Cu simul scaevola est.",
    blog: "view",
    status: "Active"
  },
  {
    id: 16,
    name: "Liam White",
    email: "liam.white@gmail.com",
    comment: "Ea summo aperiam delenit pro, admodum deseruisse nam ut, cu sea feugait omittam.",
    blog: "view",
    status: "Inactive"
  },
  {
    id: 17,
    name: "Ava Harris",
    email: "ava.harris@gmail.com",
    comment: "Errem partiendo vim te, tation diceret sapientem quo at, quem appetere vis in.",
    blog: "view",
    status: "Active"
  },
  {
    id: 18,
    name: "William Clark",
    email: "william.clark@gmail.com",
    comment: "Ex legere scripserit pro, dolore delicata intellegebat eam ne. Veniam euripidis ne pro.",
    blog: "view",
    status: "Active"
  },
  {
    id: 19,
    name: "Mia Lewis",
    email: "mia.lewis@gmail.com",
    comment: "Ei duo stet idque, in prompta maluisset sea. Te est enim suscipit comprehensam.",
    blog: "view",
    status: "Inactive"
  },
  {
    id: 20,
    name: "Ethan Walker",
    email: "ethan.walker@gmail.com",
    comment: "Quis iudico labores vim ex. Omnesque interesset usu in, veri honestatis sea te.",
    blog: "view",
    status: "Active"
  }
    // 👇 baki entries same rahengi
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
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="bg-white">
        {/* Header Controls */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">Show</span>
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
            <span className="text-gray-600 text-sm">entries</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">Search:</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  SN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Comment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Blog
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentEntries.map((row) => (
                <tr
                  key={row.id}
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 text-sm"
                >
                  <td className="px-6 py-4">{row.id}</td>
                  <td className="px-6 py-4">{row.name}</td>
                  <td className="px-2 py-4 break-words text-blue-600">
                    {row.email}
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <div className="truncate">{row.comment}</div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="inline-flex px-3 py-1 text-xs font-medium bg-blue-500 rounded text-white">
                      {row.blog}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <StatusToggle
                      initialStatus={row.status}
                      onToggle={(newStatus) =>
                        handleStatusChange(row.id, newStatus)
                      }
                    />
                  </td>
                  <td className="px-6 py-4">
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
        <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {filteredData.length === 0 ? 0 : indexOfFirstEntry + 1} to{" "}
            {Math.min(indexOfLastEntry, filteredData.length)} of{" "}
            {filteredData.length} entries
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 text-sm rounded ${
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
              className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
