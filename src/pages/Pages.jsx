import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import navbarData from "../data/Metablock-Website.navbars-23-9-25.json";
import websiteServices from "../data/Metablock-Website.websiteservices-23-9-25.json";
import ServiceInputForm from "../Compoents/ServiceInputForm";
import ServiceTabs from "../Compoents/ServiceTabs";

const getServiceData = (categoryId, subcategoryId, itemSlug) => {
    const normalizedSlug = itemSlug ? itemSlug.replace("/", "").toLowerCase() : "";
    return websiteServices.find(service =>
        service.navbarCategory?.$oid === categoryId &&
        service.navbarSubCategory?.$oid === subcategoryId &&
        (
            (itemSlug && (
                (service.slug && service.slug.replace("/", "").toLowerCase() === normalizedSlug) ||
                (service.subcategorySlug && service.subcategorySlug.replace("/", "").toLowerCase() === normalizedSlug)
            )) ||
            (!itemSlug)
        )
    );
};

const Pages = () => {
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    // Sync with navigation state from sidebar
    useEffect(() => {
        if (location.state?.selectedCategory) {
            setSelectedCategory(location.state.selectedCategory);
            setSelectedSubcategory(null);
            setSelectedItem(null);
        }
    }, [location.state?.selectedCategory]);

    // Get selected category object
    const categoryObj = navbarData.find(cat => cat._id.$oid === selectedCategory);
    const subcategoryObj = categoryObj?.subcategories?.find(sub => (sub._id?.$oid || sub.name) === selectedSubcategory);
    const itemObj = subcategoryObj?.items?.find(item => item.slug === selectedItem);

    // Get service data for input fields (works for all categories)
    const serviceData = selectedCategory && selectedSubcategory
        ? getServiceData(selectedCategory, selectedSubcategory, selectedItem)
        : null;

    // Get all service sections (tabs) from serviceData
    const serviceTabs = serviceData && serviceData.data
        ? Object.keys(serviceData.data)
        : [];

    // Tab state
    const [activeTab, setActiveTab] = useState(serviceTabs[0] || "");

    // Reset tab when serviceData changes
    useEffect(() => {
        if (serviceTabs.length > 0) setActiveTab(serviceTabs[0]);
    }, [serviceData]);

    return (
        <div className="flex max-md:flex-col bg-white mt-10 rounded max-md:p-2 p-6 gap-4 overflow-hidden">
            {/* Sidebar Tabs for service sections */}
            <div className="w-full md:w-60">
                <ul>
                    {serviceTabs.map(tab => (
                        <li key={tab}>
                            <button
                                onClick={() => setActiveTab(tab)}
                                className={`w-full text-left px-4 py-2.5 rounded my-2 border border-gray-300 transition-all duration-300 cursor-pointer ${activeTab === tab ? "bg-[#6777EF] text-white font-semibold" : "hover:bg-gray-200 text-[#6777EF]"
                                    }`}
                            >
                                {tab}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Content for selected tab */}
            <div className="flex-1 border border-gray-200 m-2 rounded-lg">
                {/* Top Level Dropdowns */}
                <div className="flex max-md:flex-col gap-4 items-start mb-6">
                    <div>
                        <label className="font-semibold block mb-2">Main Category</label>
                        <select
                            className="border rounded px-2 py-1 w-56"
                            value={selectedCategory || ""}
                            onChange={e => {
                                setSelectedCategory(e.target.value);
                                setSelectedSubcategory(null);
                                setSelectedItem(null);
                            }}
                        >
                            <option value="">Select Category</option>
                            {navbarData.map(cat => (
                                <option key={cat._id.$oid} value={cat._id.$oid}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Subcategory Dropdown */}
                    {categoryObj?.subcategories?.length > 0 && (
                        <div>
                            <label className="font-semibold block mb-2">Subcategory</label>
                            <select
                                className="border rounded px-2 py-1 w-56"
                                value={selectedSubcategory || ""}
                                onChange={e => {
                                    setSelectedSubcategory(e.target.value);
                                    setSelectedItem(null);
                                }}
                            >
                                <option value="">Select Subcategory</option>
                                {categoryObj.subcategories.map(sub => (
                                    <option key={sub._id?.$oid || sub.name} value={sub._id?.$oid || sub.name}>
                                        {sub.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Item Dropdown */}
                    {subcategoryObj?.items?.length > 0 && (
                        <div>
                            <label className="font-semibold block mb-2">Item</label>
                            <select
                                className="border rounded px-2 py-1 w-56"
                                value={selectedItem || ""}
                                onChange={e => setSelectedItem(e.target.value)}
                            >
                                <option value="">Select Item</option>
                                {subcategoryObj.items.map(item => (
                                    <option key={item._id?.$oid || item.slug} value={item.slug}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {/* Show selected category/subcategory/item */}
                <div className="flex gap-8 mt-4">
                    <div className="flex flex-col gap-2">
                        <div>
                            <span className="font-bold">Selected Category:</span> {categoryObj?.name || "-"}
                        </div>
                        <div>
                            <span className="font-bold">Selected Subcategory:</span> {subcategoryObj?.name || "-"}
                        </div>
                        <div>
                            <span className="font-bold">Selected Item:</span> {itemObj?.name || "-"}
                        </div>
                    </div>
                </div>

                {/* Input Fields for selected tab */}
                {serviceData && activeTab && (
                    <ServiceInputForm serviceData={{ data: { [activeTab]: serviceData.data[activeTab] } }} />
                )}
            </div>
        </div>
    );
};

export default Pages;