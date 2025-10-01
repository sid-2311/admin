import React from "react";

const ServiceTabs = ({ tabs, selectedTab, setSelectedTab }) => (
  <ul>
    {tabs.map((tab) => (
      <li key={tab}>
        <button
          onClick={() => setSelectedTab(tab)}
          className={`w-full text-left px-4 py-2.5 rounded my-2 border border-gray-300 transition-all duration-300 cursor-pointer ${
            selectedTab === tab
              ? "bg-[#6777EF] text-white font-semibold"
              : "hover:bg-gray-200 text-[#6777EF]"
          }`}
        >
          {tab}
        </button>
      </li>
    ))}
  </ul>
);

export default ServiceTabs;