// import { useState } from "react";

// const GeneralSettings = () => {
//     const [formData, setFormData] = useState({
//         theme: "All Theme",
//         contactInfo: "Enable",
//         layout: "LTR",
//         sidebarLarge: "AC REPAIRING",
//         sidebarSmall: "AR",
//         currencyName: "USD",
//         currencyIcon: "$",
//         timezone: "Asia/Kolkata",
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Updated Settings:", formData);
//         alert("Settings Updated ✅");
//     };

//     return (
//         <form
//             onSubmit={handleSubmit}
//             className="text-[#34395E] p-6 rounded-lg space-y-4"
//         >
//             {/* Select Theme */}
//             <div>
//                 <label className="block mb-1 font-medium">Select Theme</label>
//                 <select
//                     name="theme"
//                     value={formData.theme}
//                     onChange={handleChange}
//                     className="w-full border border-[#E4E6FC] text-[#495057] rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-violet-600"
//                 >
//                     <option>All Theme</option>
//                     <option>Dark</option>
//                     <option>Light</option>
//                 </select>

//             </div>

//             {/* Show provider contact info */}
//             <div>
//                 <label className="block mb-1 font-medium">
//                     Show provider contact info
//                 </label>
//                 <select
//                     name="contactInfo"
//                     value={formData.contactInfo}
//                     onChange={handleChange}
//                     className="w-full border border-[#E4E6FC] text-[#495057] rounded-md p-2 focus:border-violet-600"
//                 >
//                     <option>Enable</option>
//                     <option>Disable</option>
//                 </select>
//             </div>

//             {/* Layout */}
//             <div>
//                 <label className="block mb-1 font-medium">Layout</label>
//                 <select
//                     name="layout"
//                     value={formData.layout}
//                     onChange={handleChange}
//                     className="w-full border rounded-md p-2"
//                 >
//                     <option value="LTR">LTR (left to right)</option>
//                     <option value="RTL">RTL (right to left)</option>
//                 </select>
//             </div>

//             {/* Sidebar Large Header */}
//             <div>
//                 <label className="block mb-1 font-medium">Sidebar Large Header</label>
//                 <input
//                     type="text"
//                     name="sidebarLarge"
//                     value={formData.sidebarLarge}
//                     onChange={handleChange}
//                     className="w-full border rounded-md p-2"
//                 />
//             </div>

//             {/* Sidebar Small Header */}
//             <div>
//                 <label className="block mb-1 font-medium">Sidebar Small Header</label>
//                 <input
//                     type="text"
//                     name="sidebarSmall"
//                     value={formData.sidebarSmall}
//                     onChange={handleChange}
//                     className="w-full border rounded-md p-2"
//                 />
//             </div>

//             {/* Default Currency Name */}
//             <div>
//                 <label className="block mb-1 font-medium">Default Currency Name</label>
//                 <select
//                     name="currencyName"
//                     value={formData.currencyName}
//                     onChange={handleChange}
//                     className="w-full border rounded-md p-2"
//                 >
//                     <option>USD</option>
//                     <option>INR</option>
//                     <option>EUR</option>
//                 </select>
//             </div>

//             {/* Currency Icon */}
//             <div>
//                 <label className="block mb-1 font-medium">Currency Icon</label>
//                 <input
//                     type="text"
//                     name="currencyIcon"
//                     value={formData.currencyIcon}
//                     onChange={handleChange}
//                     className="w-full border rounded-md p-2"
//                 />
//             </div>

//             {/* Timezone */}
//             <div>
//                 <label className="block mb-1 font-medium">Timezone</label>
//                 <select
//                     name="timezone"
//                     value={formData.timezone}
//                     onChange={handleChange}
//                     className="w-full border rounded-md p-2"
//                 >
//                     <option>Asia/Kolkata</option>
//                     <option>UTC</option>
//                     <option>America/New_York</option>
//                     <option>Europe/London</option>
//                 </select>
//             </div>

//             {/* Update Button */}
//             <div>
//                 <button
//                     type="submit"
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md"
//                 >
//                     Update
//                 </button>
//             </div>
//         </form>
//     );
// }
// export default GeneralSettings;





import { useState } from "react";

const GeneralSettings = () => {
    const [formData, setFormData] = useState({
        theme: "All Theme",
        contactInfo: "Enable",
        layout: "LTR",
        sidebarLarge: "AC REPAIRING",
        sidebarSmall: "AR",
        currencyName: "USD",
        currencyIcon: "$",
        timezone: "Asia/Kolkata",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated Settings:", formData);
        alert("Settings Updated ✅");
    };

    const commonInputClass =
        "w-full border border-[#E4E6FC] bg-[#FDFDFF] text-[#495057] rounded p-2 focus:outline-none focus:ring-1 focus:ring-violet-600";

    return (
        <form
            onSubmit={handleSubmit}
            className="text-[#34395E] p-6 rounded-lg space-y-4"
        >
            {/* Select Theme */}
            <div>
                <label className="block mb-1 font-medium">Select Theme</label>
                <select
                    name="theme"
                    value={formData.theme}
                    onChange={handleChange}
                    className={commonInputClass}
                >
                    <option>All Theme</option>
                    <option>Dark</option>
                    <option>Light</option>
                </select>
            </div>

            {/* Show provider contact info */}
            <div>
                <label className="block mb-1 font-medium">
                    Show provider contact info
                </label>
                <select
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={handleChange}
                    className={commonInputClass}
                >
                    <option>Enable</option>
                    <option>Disable</option>
                </select>
            </div>

            {/* Layout */}
            <div>
                <label className="block mb-1 font-medium">Layout</label>
                <select
                    name="layout"
                    value={formData.layout}
                    onChange={handleChange}
                    className={commonInputClass}
                >
                    <option value="LTR">LTR (left to right)</option>
                    <option value="RTL">RTL (right to left)</option>
                </select>
            </div>

            {/* Sidebar Large Header */}
            <div>
                <label className="block mb-1 font-medium">Sidebar Large Header</label>
                <input
                    type="text"
                    name="sidebarLarge"
                    value={formData.sidebarLarge}
                    onChange={handleChange}
                    className={commonInputClass}
                />
            </div>

            {/* Sidebar Small Header */}
            <div>
                <label className="block mb-1 font-medium">Sidebar Small Header</label>
                <input
                    type="text"
                    name="sidebarSmall"
                    value={formData.sidebarSmall}
                    onChange={handleChange}
                    className={commonInputClass}
                />
            </div>

            {/* Default Currency Name */}
            <div>
                <label className="block mb-1 font-medium">Default Currency Name</label>
                <select
                    name="currencyName"
                    value={formData.currencyName}
                    onChange={handleChange}
                    className={commonInputClass}
                >
                    <option>USD</option>
                    <option>INR</option>
                    <option>EUR</option>
                </select>
            </div>

            {/* Currency Icon */}
            <div>
                <label className="block mb-1 font-medium">Currency Icon</label>
                <input
                    type="text"
                    name="currencyIcon"
                    value={formData.currencyIcon}
                    onChange={handleChange}
                    className={commonInputClass}
                />
            </div>

            {/* Timezone */}
            <div>
                <label className="block mb-1 font-medium">Timezone</label>
                <select
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleChange}
                    className={commonInputClass}
                >
                    <option>Asia/Kolkata</option>
                    <option>UTC</option>
                    <option>America/New_York</option>
                    <option>Europe/London</option>
                </select>
            </div>

            {/* Update Button */}
            <div>
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md cursor-pointer"
                >
                    Update
                </button>
            </div>
        </form>
    );
};

export default GeneralSettings;
