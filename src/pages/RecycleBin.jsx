import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeletedServices, patchService, removeService } from "../store/serviceSlice";
import { RotateCcw, Trash, LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecycleBin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, selected, error } = useSelector(state => state.service);

   const deletedServices = Array.isArray(selected) ? selected : [];
    // console.log("Deleted Services:", deletedServices);

    const [search, setSearch] = useState("");
    const [entries, setEntries] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch deleted services on mount
    useEffect(() => {
        dispatch(fetchDeletedServices());
    }, [dispatch]);

    // Pagination logic
    useEffect(() => {
        setCurrentPage(1);
    }, [entries, search]);

    // Filter logic (same as ServiceGeneralForm)
    const filtered = deletedServices.filter(
        (srv) =>
            srv.subcategoryName?.toLowerCase().includes(search.toLowerCase()) ||
            srv.slug?.toLowerCase().includes(search.toLowerCase()) ||
            srv.serviceType?.toLowerCase().includes(search.toLowerCase()) ||
            srv.navbarCategory?.name?.toLowerCase().includes(search.toLowerCase()) ||
            srv.navbarSubCategory?.name?.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / entries);
    const startIndex = (currentPage - 1) * entries;
    const paginatedData = filtered.slice(startIndex, startIndex + entries);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Restore handler
    const handleRestore = (slug) => {
        dispatch(patchService({ slug, payload: { path: "deletedAt", value: null } }));
        navigate(0);
    };

    // Permanent delete handler
    const handlePermanentDelete = (slug) => {
        dispatch(removeService(slug));
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-indigo-600 my-4">Recycle Bin</h3>
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
                    <span className="text-sm text-gray-600">Show</span>
                    <input
                        type="number"
                        min="10"
                        max="20"
                        value={entries}
                        onChange={(e) => {
                            const val = Number(e.target.value);
                            setEntries(val > 0 ? val : 1);
                            setCurrentPage(1);
                        }}
                        className="border text-gray-600 border-gray-400 rounded bg-[#FDFDFF] p-1 w-16 text-center focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                    />
                    <span className="text-sm text-gray-600">entries</span>

                </div>
                <div className="">
                    <div className="flex items-center justify-between">
                        <button
                            className="inline-flex items-center bg-blue-600 text-white my-4 px-4 py-2 rounded-md font-medium text-sm cursor-pointer"
                            title="Back to Service List"
                            onClick={handleCancel}>
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            Website Service List
                        </button>
                    </div>
                </div>

            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-600">
                    <thead className="bg-gray-100 text-gray-700 text-sm">
                        <tr>
                            <th className="px-4 py-2">Service Type</th>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">Subcategory</th>
                            <th className="px-4 py-2">Slug</th>
                            <th className="px-4 py-2">Deleted At</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="py-16 text-center">
                                    <span className="flex flex-col items-center justify-center">
                                        <LoaderCircle className="animate-spin text-blue-500" size={40} />
                                        <span className="mt-2 text-blue-500 font-medium">Loading deleted services...</span>
                                    </span>
                                </td>
                            </tr>
                        ) : filtered.length > 0 ? (
                            paginatedData.map((srv) => (
                                <tr key={srv._id} className="border-t hover:bg-gray-50 transition">
                                    <td className="px-4 py-2">{srv.serviceType}</td>
                                    <td className="px-4 py-2">{srv.navbarCategory?.name || "-"}</td>
                                    <td className="px-4 py-2">
                                        {srv.navbarSubCategory?.name || "-"} <br />
                                        <span className="text-xs text-gray-400">
                                            <span className="font-semibold">Slug:</span>{srv.navbarSubCategory?.slug || "----"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">{srv.slug}</td>
                                    <td className="px-4 py-2">
                                        {srv.deletedAt ? (
                                            <span className="text-xs text-gray-500">
                                                {new Date(srv.deletedAt).toLocaleString()}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                                            <button
                                                className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-md shadow hover:bg-green-700 transition font-semibold focus:outline-none focus:ring-2 focus:ring-green-400"
                                                onClick={() => handleRestore(srv.slug)}
                                                title="Restore Service"
                                            >
                                                <RotateCcw size={18} className="opacity-80" />
                                                <span className="hidden sm:inline">Restore</span>
                                            </button>
                                            <button
                                                className="inline-flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded-md shadow hover:bg-red-700 transition font-semibold focus:outline-none focus:ring-2 focus:ring-red-400"
                                                // onClick={() => handlePermanentDelete(srv.slug)}
                                                title="Delete Permanently"
                                            >
                                                <Trash size={18} className="opacity-80" />
                                                <span className="hidden sm:inline">Delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-6 text-gray-400">
                                    No deleted services found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {/* Pagination Controls */}
                <div className="flex justify-center sm:justify-end mt-4">
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
    );
};

export default RecycleBin;