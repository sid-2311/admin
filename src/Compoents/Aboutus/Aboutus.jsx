import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

// Import child components
// import Whytochoose from "./Whytochooseus";
// import AboutMain from "./AboutMain";
// import WhyChooseUs from "./WhyChooseUs";
// import OurMission from "./OurMission";
// import OurTeam from "./OurTeam";

const AboutusPages = () => {
  const [header, setHeader] = useState("About Us");
  const [headerDesc, setHeaderDesc] = useState(
    "There are many variations of passages of Lorem Ipsum available but the majority"
  );

  const [items, setItems] = useState([
    {
      id: 1,
      title: "Why Choose Us",
      image: "https://cdn-icons-png.flaticon.com/512/1040/1040230.png",
      description: "Reasons why clients prefer our services.",
    },
    {
      id: 2,
      title: "Our Mission",
      image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      description: "We aim to deliver innovative solutions worldwide.",
    },
    {
      id: 3,
      title: "Our Team",
      image: "https://cdn-icons-png.flaticon.com/512/1256/1256650.png",
      description: "Meet our professional and creative team members.",
    },
  ]);

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Active tab state
  const [activeTab, setActiveTab] = useState("about");

  // Switch case to render components
//   const renderContent = () => {
//     switch (activeTab) {
//       case "about":
//         return <>sjdbaj</>;
//       case "why":
//         return <Whytochoose/>;
//       case "mission":
//         return <>cjbascs</>;
//       case "team":
//         return <>nbdwqbdqw</>;
//       default:
//         return null;
//     }
//   };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      {/* <aside className="w-64 bg-white shadow p-4">
        <h2 className="text-lg font-bold mb-4">About Us Sections</h2>
        <ul>
          <li>
            <button
              onClick={() => setActiveTab("about")}
              className={`block w-full text-left px-3 py-2 rounded mb-2 ${
                activeTab === "about"
                  ? "bg-[#6777EF] text-white"
                  : "hover:bg-gray-100 text-[#6777EF]"
              }`}
            >
              About Us
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("why")}
              className={`block w-full text-left px-3 py-2 rounded mb-2 ${
                activeTab === "why"
                  ? "bg-[#6777EF] text-white"
                  : "hover:bg-gray-100 text-[#6777EF]"
              }`}
            >
              Why Choose Us
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("mission")}
              className={`block w-full text-left px-3 py-2 rounded mb-2 ${
                activeTab === "mission"
                  ? "bg-[#6777EF] text-white"
                  : "hover:bg-gray-100 text-[#6777EF]"
              }`}
            >
              Our Mission
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("team")}
              className={`block w-full text-left px-3 py-2 rounded mb-2 ${
                activeTab === "team"
                  ? "bg-[#6777EF] text-white"
                  : "hover:bg-gray-100 text-[#6777EF]"
              }`}
            >
              Our Team
            </button>
          </li>
        </ul>
      </aside> */}

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
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
          <h2 className="text-xl font-semibold mb-4">{header} Items</h2>
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
    </div>
  );
};

export default AboutusPages;
