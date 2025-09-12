import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

// Import child components
import Whytochoose from "./Whytochooseus";
import AboutusPages from "../Compoents/Aboutus/Aboutus";
// import AboutMain from "./AboutMain";
// import WhyChooseUs from "./WhyChooseUs";
// import OurMission from "./OurMission";
// import OurTeam from "./OurTeam";

const AboutusPagess = () => {
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
  const renderContent = () => {
    switch (activeTab) {
      case "about":
        return <AboutusPages/>;
      case "why":
        return <Whytochoose/>;
      case "mission":
        return <>cjbascs</>;
      case "team":
        return <>nbdwqbdqw</>;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full mt-10">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow p-4">
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
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          {/* <h2 className="text-xl font-semibold mb-4">Tab Content</h2> */}
          {renderContent()}
        </div>
    </div>
  );
};

export default AboutusPagess;
