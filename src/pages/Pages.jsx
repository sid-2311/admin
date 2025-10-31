import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loadNavbars } from '../store/navbarSlice';
import { loadServiceByAnySlug } from '../store/serviceSlice';
import ServiceInputForm from "../components/ServiceInputForm";
import ServiceTabs from "../components/ServiceTabs";
import ServicePatchForm from "../components/ServicePatchForm";
import SeoEditor from "../components/SeoEditor";
import SeoMetaPatchForm from "../components/SeoMetaPatchForm";

const Pages = () => {
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    // console.log("selectedSubcategory", selectedSubcategory);

    // console.log("selectedItem", selectedItem);


    const dispatch = useDispatch();

    const navbarState = useSelector(s => s.navbar);
    const serviceState = useSelector(s => s.service);

    // Sync with navigation state from sidebar
    useEffect(() => {
        if (location.state?.selectedCategory) {
            setSelectedCategory(location.state.selectedCategory);
            setSelectedSubcategory(null);
            setSelectedItem(null);

        }
    }, [location.state?.selectedCategory]);

    // load navbars once
    useEffect(() => {
        if (!navbarState.data?.length && !navbarState.loading) {
            dispatch(loadNavbars());
        }
    }, [dispatch, navbarState.data?.length, navbarState.loading]);

    //  Get objects for selected category, subcategory, and item
    const categoryObj = navbarState.data.find(cat => cat._id === selectedCategory || cat._id?.$oid === selectedCategory);
    const subcategoryObj = categoryObj?.subcategories?.find(sub => (sub.slug === selectedSubcategory || sub.name.toLowerCase() === selectedSubcategory));
    // console.log("subcategoryObj:", subcategoryObj);


    const itemObj = subcategoryObj?.items?.find(item => item.slug.replace("/", "") === selectedItem);
    // console.log("itemObj:", itemObj);


    // When subcategory or item changes, load the WebsiteService by the most specific slug
    useEffect(() => {
        if (selectedItem) {
            dispatch(loadServiceByAnySlug(selectedItem));
        } else if (selectedSubcategory) {
            dispatch(loadServiceByAnySlug(selectedSubcategory));
        } else {
            dispatch(loadServiceByAnySlug(null));
        }
    }, [dispatch, selectedSubcategory, selectedItem]);

    const serviceData = serviceState.selected;
    // console.log("serviceData:", serviceData);




    // Tabs for service sections (if any)
    const serviceTabs = serviceData && serviceData.data ? Object.keys(serviceData.data) : [];
    const [activeTab, setActiveTab] = useState(serviceTabs[0] || "");
    // console.log("serviceTabs:", serviceTabs);
    // console.log("activeTab:", activeTab);



    useEffect(() => {
        if (serviceTabs.length > 0) setActiveTab(serviceTabs[0]);
    }, [serviceData]);



    return (
        <div
            className={`grid gap-6 bg-white mt-10 rounded-xl p-2 md:p-6 shadow-lg min-h-[60vh]
      ${selectedSubcategory || selectedItem ? "md:grid-cols-[260px_1fr]" : "grid-cols-1"}
    `}
        >
            {/* Sidebar Tabs only when subcategory/item is selected */}
            {(selectedSubcategory || selectedItem) && (
                <aside className="md:sticky md:top-10 self-start max-h-[70vh]  bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-md p-4 mb-4 md:mb-0 flex flex-col scrollbar-thin scrollbar-thumb-rounded-md  overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-gray-200
  dark:[&::-webkit-scrollbar-thumb]:bg-gray-300">
                    <ServiceTabs
                        tabs={serviceTabs}
                        selectedTab={activeTab}
                        setSelectedTab={setActiveTab}
                    />
                </aside>
            )}

            {/* Main Content */}
            <main className="w-full border border-gray-100 rounded-xl bg-white p-4 md:p-6 shadow-sm min-h-[300px] flex flex-col justify-start">
                {/* Top Level Dropdowns */}
                <div className="flex flex-wrap gap-4 items-start mb-6">
                    {/* Category */}
                    <div className="min-w-[180px]">
                        <label className="font-semibold block mb-2 text-gray-700">Main Category</label>
                        <select
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#6777EF] bg-gray-50 text-gray-700 cursor-pointer"
                            value={selectedCategory || ""}
                            onChange={e => {
                                setSelectedCategory(e.target.value);
                                setSelectedSubcategory(null);
                                setSelectedItem(null);
                            }}
                        >
                            <option value="">Select Category</option>
                            {navbarState.data.map(cat => (
                                <option className="cursor-pointer" key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Subcategory */}
                    {categoryObj?.subcategories?.length > 0 && (
                        <div className="min-w-[180px]">
                            <label className="font-semibold block mb-2 text-gray-700">Subcategory</label>
                            <select
                                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#6777EF] bg-gray-50 text-gray-700 cursor-pointer"
                                value={selectedSubcategory || ""}
                                onChange={e => {
                                    setSelectedSubcategory(e.target.value);
                                    setSelectedItem(null);
                                }}
                            >
                                <option value="">Select Subcategory</option>
                                {categoryObj.subcategories.map(sub => (
                                    <option className="cursor-pointer" key={sub._id} value={sub.slug}>
                                        {sub.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Items */}
                    {subcategoryObj?.items?.length > 0 && (
                        <div className="min-w-[180px]">
                            <label className="font-semibold block mb-2 text-gray-700">Item</label>
                            <select
                                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#6777EF] bg-gray-50 text-gray-700 cursor-pointer"
                                value={selectedItem || ""}
                                onChange={e => setSelectedItem(e.target.value)}
                            >
                                <option value="">Select Item</option>
                                {subcategoryObj.items.map(item => (
                                    <option className="cursor-pointer" key={item._id} value={item.slug.replace("/", "")}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {/* Selected Info */}
                <div className="flex flex-wrap gap-8 mt-4 mb-6">
                    <div className="flex flex-col gap-2 text-gray-700">
                        <div>
                            <span className="font-bold text-[#6777EF]">Selected Category:</span> {categoryObj?.name || "-"}
                        </div>
                        <div>
                            <span className="font-bold text-[#6777EF]">Selected Subcategory:</span> {subcategoryObj?.name || "-"}
                        </div>
                        <div>
                            <span className="font-bold text-[#6777EF]">Selected Item:</span> {itemObj?.slug?.replace("/", "") || "-"}
                        </div>
                    </div>
                </div>

                {/* Service Data / Empty State */}
                {serviceData && activeTab ? (
                    <div className="space-y-8">
                        <ServiceInputForm serviceData={{ data: { [activeTab]: serviceData.data[activeTab] } }} />
                        <ServicePatchForm serviceData={{ data: { [activeTab]: serviceData.data[activeTab] } }} slug={serviceData.slug} />

                        <SeoMetaPatchForm serviceData={serviceData} slug={serviceData.slug} />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center min-h-[200px] text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <span className="text-lg font-semibold mb-2">No service data found for this tab.</span>
                        <span className="text-sm">Select a category, subcategory, and item to view details.</span>
                    </div>
                )}
            </main>
        </div>
    );


};

export default Pages;




// <ServiceInputForm serviceData={{ data: { [activeTab]: serviceData.data[activeTab] } }} />