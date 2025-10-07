import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { patchServiceBySlug, fetchAllServices } from "../api/api";
import { loadServiceByAnySlug } from "../store/serviceSlice";
import ToggleButton from "../ui/ToggleButton";
import { Pencil, Trash, LoaderCircle  } from "lucide-react";

// EN: General Info Management for Website Services
// HI: Website Services ke general info ko manage karne ka form
const ServiceGeneralForm = () => {
  // Animation state for modal



  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  // console.log("Services:", services);

  const [search, setSearch] = useState("");


  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteSlug, setDeleteSlug] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (showDeleteModal) {
      setModalVisible(true);
    } else {
      setTimeout(() => setModalVisible(false), 300);
    }
  }, [showDeleteModal]);

  useEffect(() => {
  if (showDeleteModal) {
    setModalVisible(true);
  } else {
    setTimeout(() => setModalVisible(false), 300);
  }
}, [showDeleteModal]);
  // console.log("Search:", search);


  // fetch services from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetchAllServices();
        setServices(res || []); // expecting backend to send array
      } catch (err) {
        console.error("Error fetching services:", err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);





  // patch handler
  const handlePatch = async (slug, path, value) => {
    console.log("Patching:", slug, path, value);

    try {
      await patchServiceBySlug(slug, { path, value });
      if (path != "status") {
        navigate(0); // refresh page to reflect changes
      }
      dispatch(loadServiceByAnySlug(slug));

      // update local state for instant UI feedback
      setServices((prev) =>
        prev.map((srv) =>
          srv.slug === slug ? { ...srv, [path]: value } : srv
        )
      );
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  // filter services
  const filtered = services.filter(
    (srv) =>
      srv.subcategoryName?.toLowerCase().includes(search.toLowerCase()) ||
      srv.slug?.toLowerCase().includes(search.toLowerCase()) ||
      srv.serviceType?.toLowerCase().includes(search.toLowerCase()) ||
      srv.navbarCategory?.name?.toLowerCase().includes(search.toLowerCase()) ||
      srv.navbarSubCategory?.name?.toLowerCase().includes(search.toLowerCase())
  );

  console.log("Filtered Services:", filtered);

  const totalPages = Math.ceil(filtered.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const paginatedData = filtered.slice(startIndex, startIndex + entries);
  // console.log("totalPages", totalPages, "startIndex", startIndex, "paginatedData", paginatedData);



  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [entries, search]);


  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-indigo-600 my-4">
        General Service Info
      </h3>

      {/* Search bar */}
      <div className="flex items-center mb-4 gap-3">
        <input
          type="text"
          placeholder="Search by type, slug, category , subcategory..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-md border border-gray-200 bg-gray-50 px-3 py-2"
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <div>
          <span className="text-sm text-gray-600 ">Show</span>
          <input
            type="number"
            min="1"
            max="20"
            value={entries}
            onChange={(e) => {
              const val = Number(e.target.value);
              setEntries(val > 0 ? val : 1);
              setCurrentPage(1);
            }}
            className="border text-gray-600 border-gray-400 rounded bg-[#FDFDFF] p-2 w-16 text-center focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm mx-1"
          />
          <span className="text-sm text-gray-600">entries</span>
        </div>
        <div>
          <button
            onClick={() => navigate("/recycle-bin")}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 my-2 rounded-lg shadow hover:from-red-600 hover:to-pink-600 transition font-semibold cursor-pointer"
            title="View deleted services"
          >
            <Trash size={18} className="opacity-80" />
            Recycle Bin
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-600">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="px-4 py-2">Service Type</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Subcategory</th>
              <th className="px-4 py-2">Slug</th>
              <th className="px-4 py-2">Status</th>
              {/* <th className="px-4 py-2">Deleted At</th> */}
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="py-16 text-center">
                  <span className="flex flex-col items-center justify-center">
                    <LoaderCircle  className="animate-spin text-blue-500" size={40} />
                    <span className="mt-2 text-blue-500 font-medium">Loading services...</span>
                  </span>
                </td>
              </tr>
            ) : filtered.length > 0 ? (
              paginatedData.map((srv) => (
                <tr
                  key={srv._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* Service Type (editable) */}
                  <td className="px-4 py-2">
                    {srv.serviceType}
                  </td>

                  {/* Category (populated) */}
                  <td className="px-4 py-2">
                    {srv.navbarCategory?.name || "-"} <br />

                  </td>

                  {/* Subcategory (populated) */}
                  <td className="px-4 py-2">
                    {srv.navbarSubCategory?.name || "-"} <br />
                    <span className="text-xs text-gray-400">
                      <span className="font-semibold">Slug:</span>{srv.navbarSubCategory?.slug || "----"}
                    </span>
                  </td>

                  {/* Slug */}
                  <td className="px-4 py-2 flex items-center gap-2">
                    {srv.slug}
                    <button
                      onClick={() => navigator.clipboard.writeText(srv.slug)}
                      className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                    >
                      Copy
                    </button>
                  </td>

                  {/* Status Toggle */}
                  <td className="px-4 py-2">
                   <button title="Toggle Status to enable or disable service">
                     <ToggleButton
                      enabled={srv.status}
                      onToggle={(val) => handlePatch(srv.slug, "status", val)}
                    />
                   </button>
                  </td>

                  {/* Deleted At */}
                  {/* <td className="px-4 py-2">
                    {srv.deletedAt ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {new Date(srv.deletedAt).toLocaleString()}
                        </span>
                        <button
                          onClick={() => handlePatch(srv.slug, "deletedAt", null)}
                          className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          Clear
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td> */}

                  {/* Actions */}
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer"
                      onClick={() => navigate("/services/edit", { state: { editData: srv } })}
                      title="Edit Service General Info"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600 cursor-pointer"
                      onClick={() => {
                        setDeleteSlug(srv.slug);
                        setShowDeleteModal(true);
                      }}
                      title="Delete Temporarily"
                    >
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-400">
                  No services found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Pagination Controls */}
        <div className="flex justify-center sm:justify-between mt-4">
            <div>
            <span className="text-sm text-gray-600 ml-4 border-b-1 border-gray-400 pb-1">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + entries, filtered.length)} of{" "}
              {filtered.length} entries
            </span>
          </div>
         <div>
           <nav className="flex flex-wrap items-center space-x-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded text-sm ${currentPage === 1
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
                className={`px-3 py-1 border rounded text-sm ${currentPage === i + 1
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
              className={`px-3 py-1 border rounded text-sm ${currentPage === totalPages
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




      {/* Delete Confirmation Modal - Professional Modern Design */}
      {(showDeleteModal || modalVisible) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-60 transition-opacity duration-300"
          style={{
            opacity: showDeleteModal ? 1 : 0,
            pointerEvents: showDeleteModal ? 'auto' : 'none',
          }}
        >
          <div
            className={`relative w-full max-w-xl mx-auto bg-white rounded-2xl shadow-2xl p-0 flex flex-col items-center animate-modal ${showDeleteModal ? 'modal-in' : 'modal-out'}`}
            style={{
              transform: showDeleteModal ? 'scale(1)' : 'scale(0.97)',
              transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            <div className="w-full flex flex-col items-center justify-center pt-12 pb-8 px-10">
              <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-full shadow-lg border-4 border-white mb-4">
                <Trash size={36} className="text-white" />
              </div>
              <h4 className="text-2xl font-extrabold mb-2 text-gray-900 text-center tracking-tight">Delete Service?</h4>
              <p className="mb-6 text-gray-600 text-center text-base">This action will temporarily delete the service. You can restore it later from the recycle bin.</p>
              <div className="flex justify-center gap-5 w-full mt-2">
                <button
                  className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-all duration-200 shadow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow border border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400"
                  onClick={() => {
                    handlePatch(deleteSlug, "deletedAt", new Date());
                    setShowDeleteModal(false);
                    setDeleteSlug(null);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          {/* Modal animation styles */}
          <style>{`
            @keyframes modalIn {
              0% { opacity: 0; transform: scale(0.97); }
              100% { opacity: 1; transform: scale(1); }
            }
            @keyframes modalOut {
              0% { opacity: 1; transform: scale(1); }
              100% { opacity: 0; transform: scale(0.97); }
            }
            .animate-modal.modal-in {
              animation: modalIn 0.3s cubic-bezier(0.4,0,0.2,1);
            }
            .animate-modal.modal-out {
              animation: modalOut 0.3s cubic-bezier(0.4,0,0.2,1);
            }
          `}</style>
        </div>
      )}

    </div>
  );
};

export default ServiceGeneralForm;
