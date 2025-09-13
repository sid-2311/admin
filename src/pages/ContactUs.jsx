// import React, { useState } from "react";

// const ContactUs = () => {
//     const [form, setForm] = useState({
//         email: "metauser1@gmail.com\nmetauser@gmail.com",
//         phone: "+1347-430-9510\n+4247-100-9510",
//         address:
//             "7232 Broadway Suite 308, Jackson Heights, 11372, NY, United States",
//         supportTime: "10.00AM to 07.00PM",
//         offDay: "Friday Off",
//         googleMap: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.681138843672!2d-73.89482218459395!3d40.747041279328165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25f01328248b3%3A0x62300784dd275f96!2s7232%20Broadway%20%23308%2C%20Jackson%20Heights%2C%20NY%2011372%2C%20USA!5e0!3m2!1sen!2sin!4v1635000000000!5m2!1sen!2sin" width="100%" height="250" style="border:0;" allowFullScreen="" loading="lazy"></iframe>`
//     });

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         alert("Contact info updated!");
//     };

//     return (
//         <div className="min-h-screen flex justify-center mt-10">
//             <div className="w-full bg-white rounded shadow-md p-6">
//                 {/* Supporter Image */}
//                 <div className="flex flex-col items-start mb-6">
//                     <img
//                         src="https://via.placeholder.com/300x200"
//                         alt="Supporter Image"
//                         className="rounded-lg mb-4 w-48 object-cover"
//                     />
//                     <input type="file" className="block text-sm" />
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-5">
//                     {/* Email */}
//                     <div>
//                         <label className="block text-sm font-medium">Email *</label>
//                         <textarea
//                             name="email"
//                             value={form.email}
//                             onChange={handleChange}
//                             className="w-full border border-[#E4E6FC] rounded-lg p-2 bg-[#FDFDFF] focus:ring focus:ring-violet-400 outline-violet-300"
//                             rows="2"
//                         />
//                     </div>

//                     {/* Phone */}
//                     <div>
//                         <label className="block text-sm font-medium">Phone *</label>
//                         <textarea
//                             name="phone"
//                             value={form.phone}
//                             onChange={handleChange}
//                             className="w-full border border-[#E4E6FC] rounded-lg p-2 bg-[#FDFDFF] focus:ring focus:ring-blue-200 outline-violet-300"
//                             rows="2"
//                         />
//                     </div>

//                     {/* Address */}
//                     <div>
//                         <label className="block text-sm font-medium">Address *</label>
//                         <textarea
//                             name="address"
//                             value={form.address}
//                             onChange={handleChange}
//                             className="w-full border border-[#E4E6FC] rounded-lg p-2 bg-[#FDFDFF] focus:ring focus:ring-blue-200 outline-violet-300"
//                             rows="2"
//                         />
//                     </div>

//                     {/* Support Time */}
//                     <div>
//                         <label className="block text-sm font-medium">Support Time *</label>
//                         <input
//                             type="text"
//                             name="supportTime"
//                             value={form.supportTime}
//                             onChange={handleChange}
//                             className="w-full border border-[#E4E6FC] rounded-lg p-2 bg-[#FDFDFF] focus:ring focus:ring-blue-200 outline-violet-300"
//                         />
//                     </div>

//                     {/* Off Day */}
//                     <div>
//                         <label className="block text-sm font-medium">Off Day *</label>
//                         <input
//                             type="text"
//                             name="offDay"
//                             value={form.offDay}
//                             onChange={handleChange}
//                             className="w-full border border-[#E4E6FC] rounded-lg p-2 bg-[#FDFDFF] focus:ring focus:ring-blue-200 outline-violet-300"
//                         />
//                     </div>

//                     {/* Google Map */}
//                     <div>
//                         <label className="block text-sm font-medium">Google Map *</label>
//                         <textarea
//                             name="googleMap"
//                             value={form.googleMap}
//                             onChange={handleChange}
//                             className="w-full border border-[#E4E6FC] rounded-lg p-2 bg-[#FDFDFF] focus:ring focus:ring-blue-200 outline-violet-300"
//                             rows="4"
//                         />
//                         <div
//                             className="mt-3"
//                             dangerouslySetInnerHTML={{ __html: form.googleMap }}
//                         />
//                     </div>

//                     {/* Update Button */}
//                     <div>
//                         <button
//                             type="submit"
//                             className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-[#394EEA] shadow-md cursor-pointer"
//                         >
//                             Update
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }
// export default ContactUs;












import React, { useState } from "react";

const ContactUs = () => {
    const [form, setForm] = useState({
        email: "metauser1@gmail.com\nmetauser@gmail.com",
        phone: "+1347-430-9510\n+4247-100-9510",
        address:
            "7232 Broadway Suite 308, Jackson Heights, 11372, NY, United States",
        supportTime: "10.00AM to 07.00PM",
        offDay: "Friday Off",
        googleMap: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.681138843672!2d-73.89482218459395!3d40.747041279328165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25f01328248b3%3A0x62300784dd275f96!2s7232%20Broadway%20%23308%2C%20Jackson%20Heights%2C%20NY%2011372%2C%20USA!5e0!3m2!1sen!2sin!4v1635000000000!5m2!1sen!2sin" width="100%" height="250" style="border:0;" allowFullScreen="" loading="lazy"></iframe>`
    });

    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Contact info updated!");
    };

    return (
        <div className="min-h-screen flex justify-center mt-10">
            <div className="w-full bg-white rounded shadow-md p-6">
                {/* Supporter Image */}
                <div className="flex flex-col items-start mb-6">
                    <p className="mb-2 text-[#34395E]">Supporter Image</p>
                    <img
                        src={image || "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}
                        alt="Supporter Image"
                        className="rounded-lg mb-4 w-48 h-32 object-cover border"
                    />
                    <p className="mb-2 text-[#34395E]">New Image</p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block text-sm file:mr-4 file:py-2 file:px-4
                                   file:rounded-lg file:border-0
                                   file:text-sm file:font-semibold
                                   file:bg-blue-50 file:text-blue-700
                                   hover:file:bg-blue-100 cursor-pointer"
                    />
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 text-[#34395E]">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Email <span className="text-[#FC544B]">*</span></label>
                        <textarea
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border border-[#E4E6FC] text-[#495057] rounded-lg p-2 bg-[#FDFDFF] focus:ring focus:ring-violet-400 outline-violet-300"
                            rows="2"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Phone <span className="text-[#FC544B]">*</span></label>
                        <textarea
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full border border-[#E4E6FC] text-[#495057] rounded-lg p-2 bg-[#FDFDFF] focus:ring focus:ring-blue-200 outline-violet-300"
                            rows="2"
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Address <span className="text-[#FC544B]">*</span></label>
                        <textarea
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            className="w-full border border-[#E4E6FC] text-[#495057] rounded-lg p-2 bg-[#FDFDFF] focus:ring focus:ring-blue-200 outline-violet-300"
                            rows="2"
                        />
                    </div>

                    {/* Support Time */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Support Time <span className="text-[#FC544B]">*</span></label>
                        <input
                            type="text"
                            name="supportTime"
                            value={form.supportTime}
                            onChange={handleChange}
                            className="w-full border border-[#E4E6FC] text-[#495057] rounded-lg p-2 bg-[#FDFDFF] focus:ring focus:ring-blue-200 outline-violet-300"
                        />
                    </div>

                    {/* Off Day */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Off Day <span className="text-[#FC544B]">*</span></label>
                        <input
                            type="text"
                            name="offDay"
                            value={form.offDay}
                            onChange={handleChange}
                            className="w-full border border-[#E4E6FC] text-[#495057] rounded-lg p-2 bg-[#FDFDFF] focus:ring focus:ring-blue-200 outline-violet-300"
                        />
                    </div>

                    {/* Google Map */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Google Map <span className="text-[#FC544B]">*</span></label>
                        <textarea
                            name="googleMap"
                            value={form.googleMap}
                            onChange={handleChange}
                            className="w-full border border-[#E4E6FC] text-[#495057] rounded-lg p-2 bg-[#FDFDFF] focus:ring focus:ring-blue-200 outline-violet-300"
                            rows="4"
                        />
                        <div
                            className="mt-3"
                            dangerouslySetInnerHTML={{ __html: form.googleMap }}
                        />
                    </div>

                    {/* Update Button */}
                    <div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-[#394EEA] shadow-md cursor-pointer"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
