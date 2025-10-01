import React, { useState } from "react";

const TabsLayout = ({ sections, title = "Sections" }) => {
  const [activeTab, setActiveTab] = useState(sections[0]?.key || "");

  return (
    <div className="flex h-full mt-10">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow p-4">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <ul>
          {sections.map((section) => (
            <li key={section.key}>
              <button
                onClick={() => setActiveTab(section.key)}
                className={`block w-full text-left px-3 py-2 rounded mb-2 ${
                  activeTab === section.key
                    ? "bg-[#6777EF] text-white"
                    : "hover:bg-gray-100 text-[#6777EF]"
                }`}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        {sections.find((s) => s.key === activeTab)?.content}
      </div>
    </div>
  );
};

export default TabsLayout;
