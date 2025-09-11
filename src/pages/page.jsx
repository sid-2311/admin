import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const AboutusPages = () => {
  const [header, setHeader] = useState("Pages");
  const [headerDesc, setHeaderDesc] = useState(
    "There are many variations of passages of Lorem Ipsum available but the majority"
  );

  const [items, setItems] = useState([
    {
      id: 1,
      title: "Landing Page",
      image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      description:
        "This is the landing page where users get first impression about our service."
    },
    {
      id: 2,
      title: "About Us Page",
      image: "https://cdn-icons-png.flaticon.com/512/1256/1256650.png",
      description:
        "About us page describes our story, team, and mission statement."
    }
  ]);

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6">
      {/* Header Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Header</h2>
        <input
          type="text"
          className="border p-2 rounded w-full mb-4"
          value={header}
          onChange={(e) => setHeader(e.target.value)}
        />
        <h3 className="text-md font-semibold mb-2">Header Description</h3>
        <textarea
          className="border p-2 rounded w-full mb-4"
          rows={3}
          value={headerDesc}
          onChange={(e) => setHeaderDesc(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
          Update
        </button>
      </div>

      {/* Items List */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">{header} Item</h2>
        <table className="w-full border-collapse bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Image</th>
              <th className="p-3">Description</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3">{item.title}</td>
                <td className="p-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-contain"
                  />
                </td>
                <td className="p-3">{item.description}</td>
                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                  <button className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AboutusPages;
