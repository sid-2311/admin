import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loadNavbars } from '../store/navbarSlice';
import { loadServiceByAnySlug } from '../store/serviceSlice';
import ServiceInputForm from "../Compoents/ServiceInputForm";
import ServiceTabs from "../Compoents/ServiceTabs";

const Pages = () => {
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
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



    // Tabs for service sections (if any)
    const serviceTabs = serviceData && serviceData.data ? Object.keys(serviceData.data) : [];
    const [activeTab, setActiveTab] = useState(serviceTabs[0] || "");
    console.log("serviceTabs:", serviceTabs);
    console.log("activeTab:", activeTab);
    
    

    useEffect(() => {
        if (serviceTabs.length > 0) setActiveTab(serviceTabs[0]);
    }, [serviceData]);

    return (
        <div className="flex max-md:flex-col bg-white mt-10 rounded p-6 gap-4">


            {/* Sidebar Tabs for service sections */}
            <div className="w-full md:w-60 sticky top-10 self-start">
                <ServiceTabs
                    tabs={serviceTabs}
                    selectedTab={activeTab}
                    setSelectedTab={setActiveTab}
                />
            </div>





            {/* Content for selected tab */}
            <div className="flex-1 border border-gray-200 m-2 rounded-lg">
                {/* Top Level Dropdowns */}
                <div className="flex gap-4 items-start mb-6">
                    <div>
                        <label className="font-semibold block mb-2">Main Category</label>
                        <select
                            className="border rounded px-2 py-1 w-56"
                            value={selectedCategory || ""}
                            onChange={e => {
                                setSelectedCategory(e.target.value);
                                setSelectedSubcategory(null);
                                // setSelectedItem(null);
                            }}
                        >
                            <option value="">Select Category</option>
                            {navbarState.data.map(cat => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* subcategories dropdown */}
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
                                    <option key={sub._id} value={sub.slug || sub.name.toLowerCase()}>
                                        {sub.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* items dropdown */}
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
                                    <option key={item._id} value={item.slug.replace("/", "")}>
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
                            <span className="font-bold">Selected Item:</span> {itemObj?.slug.replace("/", "" ) }
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