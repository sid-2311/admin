// ServiceTable.jsx
import { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import StatusToggle from "../ui/ToggleButton";

export default function Category() {
  const [services] = useState([
    {
      id: 1,
      name: "Painting",
      image: "/images/painting.jpg",
      icon: "🪣",
      status: "Active",
    },
    {
      id: 2,
      name: "Cleaning",
      image: "/images/cleaning.jpg",
      icon: "🔌",
      status: "Active",
    },
    {
      id: 3,
      name: "Pest Control",
      image: "/images/pest.jpg",
      icon: "🛠️",
      status: "Active",
    },
    {
      id: 4,
      name: "AC Repair",
      image: "/images/ac.jpg",
      icon: "🧴",
      status: "Active",
    },
    {
      id: 5,
      name: "Car Services",
      image: "/images/car.jpg",
      icon: "⚙️",
      status: "Active",
    },
    {
      id: 6,
      name: "Plumbing",
      image: "/images/plumbing.jpg",
      icon: "🚚",
      status: "Active",
    },
  ]);

  return (
    <div className="p-6">
      {/* Add New Button */}
      <div className="flex justify-end items-center mb-4">
        {/* <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
          + Add New
        </button> */}
        <span className="text-xs mr-2">Search:</span>
            <input
              type="text"
              className="border border-gray-400 rounded focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
            
            //   onChange={(e) => setSearch(e.target.value)}
            />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white ">
        <table className="w-full text-sm table-fixed text-left text-gray-600">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="px-4 py-3">SN</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Icon</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={service.id} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 text-sm">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{service.name}</td>
                <td className="px-4 py-3">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                </td>
                <td className="px-4 py-3 text-2xl">{service.icon}</td>
                <td className="px-4 py-3">
                  <span className="">
                    <StatusToggle  initialStatus={service.status}/>
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    <Pencil size={16} />
                  </button>
                  <button className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
                    <Trash size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <span>Showing 1 to {services.length} of {services.length} entries</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-gray-200 rounded text-gray-500 cursor-not-allowed">
            Previous
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded">
            1
          </button>
          <button className="px-3 py-1 bg-gray-200 rounded text-gray-500 cursor-not-allowed">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
