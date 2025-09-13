import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import StatusToggle from "../ui/ToggleButton";

const PopularBlog = () => {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [selectedBlog, setSelectedBlog] = useState("");

  const data = [
    {
      id: 1,
      blog: "Switchboard an a electrical connecting cable.",
      category: "Electric & Plumbing",
      image: "https://via.placeholder.com/100",
      status: "Active",
    },
    {
      id: 2,
      blog: "Home Move Service From One City to Another City",
      category: "Home Move",
      image: "https://via.placeholder.com/100",
      status: "Active",
    },
    {
      id: 3,
      blog: "Service maintenance repair engine and washing in transport",
      category: "Emergency Services",
      image: "https://via.placeholder.com/100",
      status: "Active",
    },
    {
      id: 4,
      blog: "Logistics of container smart cargo ship and cargo plane",
      category: "Home Cleaning",
      image: "https://via.placeholder.com/100",
      status: "Active",
    },
    {
      id: 5,
      blog: "Modern interior design ideas for smart homes",
      category: "Interior",
      image: "https://via.placeholder.com/100",
      status: "Active",
    },
    {
      id: 6,
      blog: "Best gardening tips for small spaces",
      category: "Gardening",
      image: "https://via.placeholder.com/100",
      status: "Active",
    },
    {
      id: 7,
      blog: "Top 10 car maintenance hacks everyone should know",
      category: "Automobile",
      image: "https://via.placeholder.com/100",
      status: "Active",
    },
    {
      id: 8,
      blog: "Guide to choosing the best kitchen appliances",
      category: "Kitchen",
      image: "https://via.placeholder.com/100",
      status: "Active",
    },
    {
      id: 9,
      blog: "Travel tips for first-time international flyers",
      category: "Travel",
      image: "https://via.placeholder.com/100",
      status: "Active",
    },
    {
      id: 10,
      blog: "Effective workout routines for beginners",
      category: "Fitness",
      image: "https://via.placeholder.com/100",
      status: "Active",
    },
    {
      id: 11,
      blog: "Delicious and easy breakfast recipes",
      category: "Food",
      image: "https://via.placeholder.com/100",
      status: "Active",
    },
    {
      id: 12,
      blog: "DIY hacks for organizing your workspace",
      category: "DIY",
      image: "https://via.placeholder.com/100",
      status: "Active",
    },
    {
      id: 13,
      blog: "How to save electricity in your home",
      category: "Electric & Plumbing",
      image: "https://via.placeholder.com/100",
      status: "Active",
    },
    {
      id: 14,
      blog: "Best cleaning hacks for busy moms",
      category: "Home Cleaning",
      image: "https://via.placeholder.com/100",
      status: "Active",
    },
    {
      id: 15,
      blog: "Essential tools for every car owner",
      category: "Automobile",
      image: "https://via.placeholder.com/100",
      status: "Active",
    },
    {
      id: 16,
      blog: "How to plan a perfect wedding event",
      category: "Event Management",
      image: "https://via.placeholder.com/100",
      status: "Active",
    },
    {
      id: 17,
      blog: "Best smartphones under budget in 2025",
      category: "Technology",
      image: "https://via.placeholder.com/100",
      status: "Active",
    },
    {
      id: 18,
      blog: "Top 5 investment tips for beginners",
      category: "Finance",
      image: "https://via.placeholder.com/100",
      status: "Active",
    },
    {
      id: 19,
      blog: "Home security systems you should consider",
      category: "Home Security",
      image: "https://via.placeholder.com/100",
      status: "Active",
    },
    {
      id: 20,
      blog: "How to boost your productivity at work",
      category: "Career",
      image: "https://via.placeholder.com/100",
      status: "Active",
    },
    {
      id: 21,
      blog: "Quick tips for maintaining your laptop",
      category: "Technology",
      image: "https://via.placeholder.com/100",
      status: "Active",
    },
    {
      id: 22,
      blog: "Healthy meal prep ideas for the week",
      category: "Food",
      image: "https://via.placeholder.com/100",
      status: "Active",
    },
    {
      id: 23,
      blog: "Tips for growing indoor plants easily",
      category: "Gardening",
      image: "https://via.placeholder.com/100",
      status: "Active",
    },
    {
      id: 24,
      blog: "Best budget-friendly travel destinations",
      category: "Travel",
      image: "https://via.placeholder.com/100",
      status: "Active",
    },
    {
      id: 25,
      blog: "Top home décor trends to follow in 2025",
      category: "Interior",
      image: "https://via.placeholder.com/100",
      status: "Active",
    },
  ];

  // search filter
  const filteredData = data.filter((item) =>
    item.blog.toLowerCase().includes(search.toLowerCase())
  );

  // slice data according to entries
  const displayedData = filteredData.slice(0, entries);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Blog Selection */}
      <div className="bg-white p-5 mb-6">
        <label className="block font-semibold mb-2">Blog</label>
        <select
          className="w-full mb-2 px-4 py-3 bg-[#FDFDFF] border border-gray-300 rounded-md focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
          value={selectedBlog}
          onChange={(e) => setSelectedBlog(e.target.value)}
        >
          <option value="">Select Blog</option>
          {data.map((item) => (
            <option key={item.id} value={item.blog}>
              {item.blog}
            </option>
          ))}
        </select>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700">
          Save
        </button>
      </div>

      {/* Table */}
      <div className="bg-white p-5">
        <div className="flex justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Show</span>
            <input
              type="number"
              className="border text-gray-400 border-gray-400 rounded bg-[#FDFDFF] p-1 w-16 text-center focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
              value={entries}
              onChange={(e) => setEntries(Number(e.target.value))}
              min="1"
            />
            <span className="text-sm text-gray-600">entries</span>
          </div>

          <div className="text-sm text-gray-600">
            Search:{" "}
            <input
              type="text"
              className="border border-gray-400 rounded focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">SN</th>
              <th className="p-2">Blog</th>
              <th className="p-2">Category</th>
              <th className="p-2">Image</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((item, index) => (
              <tr
                key={item.id}
                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 text-sm"
              >
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{item.blog}</td>
                <td className="p-2">{item.category}</td>
                <td className="p-2">
                  <img
                    src={item.image}
                    alt={item.blog}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="p-2">
                  <StatusToggle initialStatus={item.status} />
                </td>
                <td className="p-2 text-center">
                  <button className="bg-red-500 text-white p-2 rounded">
                    <FaTrash />
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

export default PopularBlog;
