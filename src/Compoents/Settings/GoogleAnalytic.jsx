import { useState } from "react";

const GoogleAnalyticsForm = () => {
    const [formData, setFormData] = useState({
        allowAnalytics: "Enable",
        trackingId: "UA-84213520-6",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Google Analytics Settings:", formData);
        alert("Google Analytics Settings Updated ✅");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 bg-white rounded-lg shadow-md space-y-4"
        >
            {/* Allow Google Analytic */}
            <div>
                <label className="block mb-1 font-medium">Allow Google Analytic</label>
                <select
                    name="allowAnalytics"
                    value={formData.allowAnalytics}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                >
                    <option>Enable</option>
                    <option>Disable</option>
                </select>
            </div>

            {/* Analytic Tracking ID */}
            <div>
                <label className="block mb-1 font-medium">Analytic Tracking Id</label>
                <input
                    type="text"
                    name="trackingId"
                    value={formData.trackingId}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                />
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
export default GoogleAnalyticsForm;