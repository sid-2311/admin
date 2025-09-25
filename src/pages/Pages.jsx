import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import navbarData from "../data/Metablock-Website.navbars-23-9-25.json";
import websiteServices from "../data/Metablock-Website.websiteservices-23-9-25.json";
import ServiceInputForm from "../Compoents/ServiceInputForm";





// Function to get service data based on selected category, subcategory, and item
const getServiceData = (categoryId, subcategoryId, itemSlug) => {
    console.log(categoryId, subcategoryId, itemSlug);
    // Normalize slug for matching
    const normalizedSlug = itemSlug ? itemSlug.replace("/", "").toLowerCase() : "";

    // Try to match with all possible combinations
    return websiteServices.find(service =>
        service.navbarCategory?.$oid === categoryId &&
        service.navbarSubCategory?.$oid === subcategoryId &&
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



    // Sync with navigation state from sidebar
    useEffect(() => {
        if (location.state?.selectedCategory) {
            setSelectedCategory(location.state.selectedCategory);
        }
    }, [location.state?.selectedCategory]);



    

    //  Get objects for selected category, subcategory, and item
    const categoryObj = navbarData.find(cat => cat._id.$oid === selectedCategory);
    const subcategoryObj = categoryObj?.subcategories?.find(sub => (sub._id?.$oid || sub.name) === selectedSubcategory);
    const itemObj = subcategoryObj?.items?.find(item => item.slug === selectedItem);



    // Get service data for input fields (works for all categories)
    const serviceData = selectedCategory && selectedSubcategory
        ? getServiceData(selectedCategory, selectedSubcategory, selectedItem)
        : null;




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


            

            {/* Input Fields based on websiteServices JSON */}
            <ServiceInputForm serviceData={serviceData} />
        </div>
    );
};

export default Pages;