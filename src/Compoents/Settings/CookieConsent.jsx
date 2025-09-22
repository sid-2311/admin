import { useState } from "react";

const CookieConsent = () => {
    const [formData, setFormData] = useState({
        allowConsent: "Enable",
        border: "Thin",
        corner: "Normal",
        backgroundColor: "#1E40AF",
        textColor: "#000000",
        borderColor: "#1E40AF",
        buttonColor: "#FDFDF0",
        buttonTextColor: "#111827",
        linkText: "More Info",
        buttonText: "Yes",
        message:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Cookie Consent Settings:", formData);
        alert("Cookie Consent Updated ✅");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 bg-white rounded-lg shadow-md space-y-4"
        >
            {/* Top Row */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-1 font-medium">Allow Cookie Consent</label>
                    <select
                        name="allowConsent"
                        value={formData.allowConsent}
                        onChange={handleChange}
                        className="w-full border bg-[#FDFDFF] rounded-md p-2"
                    >
                        <option>Enable</option>
                        <option>Disable</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Border</label>
                    <select
                        name="border"
                        value={formData.border}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2"
                    >
                        <option>Thin</option>
                        <option>Thick</option>
                        <option>None</option>
                    </select>
                </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-1 font-medium">Corner</label>
                    <select
                        name="corner"
                        value={formData.corner}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2"
                    >
                        <option>Normal</option>
                        <option>Rounded</option>
                        <option>Pill</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Background Color</label>
                    <input
                        type="color"
                        name="backgroundColor"
                        value={formData.backgroundColor}
                        onChange={handleChange}
                        className="w-full h-10 border rounded-md p-1"
                    />
                </div>
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-1 font-medium">Text Color</label>
                    <input
                        type="color"
                        name="textColor"
                        value={formData.textColor}
                        onChange={handleChange}
                        className="w-full h-10 border rounded-md p-1"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Border Color</label>
                    <input
                        type="color"
                        name="borderColor"
                        value={formData.borderColor}
                        onChange={handleChange}
                        className="w-full h-10 border rounded-md p-1"
                    />
                </div>
            </div>

            {/* Fourth Row */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-1 font-medium">Button Color</label>
                    <input
                        type="color"
                        name="buttonColor"
                        value={formData.buttonColor}
                        onChange={handleChange}
                        className="w-full h-10 border rounded-md p-1"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Button Text Color</label>
                    <input
                        type="color"
                        name="buttonTextColor"
                        value={formData.buttonTextColor}
                        onChange={handleChange}
                        className="w-full h-10 border rounded-md p-1"
                    />
                </div>
            </div>

            {/* Fifth Row */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-1 font-medium">Link Text</label>
                    <input
                        type="text"
                        name="linkText"
                        value={formData.linkText}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Button Text</label>
                    <input
                        type="text"
                        name="buttonText"
                        value={formData.buttonText}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2"
                    />
                </div>
            </div>

            {/* Message */}
            <div>
                <label className="block mb-1 font-medium">Message</label>
                <textarea
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                ></textarea>
            </div>

            {/* Update Button */}
            <div>
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md"
                >
                    Update
                </button>
            </div>
        </form>
    );
}
export default CookieConsent;