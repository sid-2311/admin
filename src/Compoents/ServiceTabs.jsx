import React from "react";

const ServiceTabs = ({ tabs, selectedTab, setSelectedTab }) => (
    <div className="flex flex-col gap-2">
        {tabs.map(tab => (
            <button
                key={tab}
                className={`px-4 py-2 rounded text-left ${selectedTab === tab ? "bg-blue-600 text-white" : "bg-gray-100"}`}
                onClick={() => setSelectedTab(tab)}
            >
                {tab}
            </button>
        ))}
    </div>
);

export default ServiceTabs;