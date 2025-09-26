import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loadNavbars } from '../store/navbarSlice';
// import { loadServicesByCategory, loadServiceBySlug} from '../store/serviceSlice';
import {  loadServiceByAnySlug } from '../store/serviceSlice';
import ServiceInputForm from "../Compoents/ServiceInputForm";







// Function to get service data based on selected category, subcategory, and item
const getServiceData = (categoryId, subcategorySlug, itemSlug) => {
    console.log(categoryId, subcategorySlug, itemSlug);
    // Normalize slug for matching
    const normalizedSlug = itemSlug ? itemSlug.replace("/", "").toLowerCase() : "";

    // Try to match with all possible combinations
    return websiteServices.find(service =>
        service.navbarCategory?.$oid === categoryId &&
        service.navbarSubCategory?.$oid === subcategorySlug &&
        (
            // Match by item slug
            (itemSlug && (
                (service.slug && service.slug.replace("/", "").toLowerCase() === normalizedSlug) ||
                (service.subcategorySlug && service.subcategorySlug.replace("/", "").toLowerCase() === normalizedSlug)
            )) ||
            // If no itemSlug, match just category and subcategory
            (!itemSlug)
        )
    );
};




// Main Pages component
const Pages = () => {
    const location = useLocation();
    // State to track selected category, subcategory, and item
        const [selectedCategory, setSelectedCategory] = useState(null);
        const [selectedSubcategory, setSelectedSubcategory] = useState(null);
        const [selectedItem, setSelectedItem] = useState(null);
        console.log(selectedCategory, selectedSubcategory, selectedItem);
        
        const dispatch = useDispatch();
        const navbarState = useSelector(s => s.navbar);
        // console.log(navbarState);
        
        const serviceState = useSelector(s => s.service);
        // console.log(serviceState);
        





    // Sync with navigation state from sidebar
    useEffect(() => {
        if (location.state?.selectedCategory) {
            setSelectedCategory(location.state.selectedCategory);
        }
    }, [location.state?.selectedCategory]);

    // load navbars once
    useEffect(() => {
      if (!navbarState.data?.length && !navbarState.loading) {
        dispatch(loadNavbars());
      }
    }, []);



    

    //  Get objects for selected category, subcategory, and item
    const categoryObj = navbarState.data.find(cat => cat._id === selectedCategory || cat._id?.$oid === selectedCategory);
    console.log("CategoryObj Subcategories", categoryObj?.subcategories);
    
    const subcategoryObj = categoryObj?.subcategories?.find(sub => (sub.slug === selectedSubcategory || sub.name.toLowerCase() === selectedSubcategory));
    const itemObj = subcategoryObj?.items?.find(item => item.slug === selectedItem);




    // // When category changes, load all services for that category (optional, keep if you want the list)
    // useEffect(() => {
    //     if (categoryObj?.slug) {
    //         dispatch(loadServicesByCategory(categoryObj.slug));
    //     }
    // }, [categoryObj?.slug]);






    // When subcategory or item changes, load the WebsiteService by the most specific slug
    useEffect(() => {
        // Priority: item slug > subcategory slug
        if (selectedItem) {
            dispatch(loadServiceByAnySlug(selectedItem));
        } else if (selectedSubcategory) {
            dispatch(loadServiceByAnySlug(selectedSubcategory));
        } else {
            // Optionally clear selected service if nothing is selected
            dispatch(loadServiceByAnySlug(null));
        }
    }, [selectedSubcategory, selectedItem]);

    const serviceData = serviceState.selected;

    console.log("Service Data:", serviceData);
    




        // Render the component
    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Top Level Dropdowns */}
            <div className="flex gap-4 items-start">
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
                        {navbarState.data.map(cat => (
                            <option key={cat._id} value={cat._id}>
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
                                <option key={sub._id } value={sub.slug || sub.name.toLowerCase() }>
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
                        <span className="font-bold">Selected Item:</span> {itemObj?.name || "-"}
                    </div>
                </div>
            </div>


            

            {/* Input Fields based on websiteServices JSON */}
            <ServiceInputForm serviceData={serviceData} />
        </div>
    );
};

export default Pages;