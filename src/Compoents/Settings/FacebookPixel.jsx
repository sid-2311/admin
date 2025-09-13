import { useState } from "react";
import StatusToggle from "../../ui/ToggleButton";

const FacebookPixel = () => {
    const [isPixelEnabled, setIsPixelEnabled] = useState(true); // Default to enabled
    const [appId, setAppId] = useState("972911606915059");

    const handleUpdate = () => {
        console.log("Facebook Pixel Enabled:", isPixelEnabled);
        console.log("Facebook App ID:", appId);
        // Add your update logic here
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Allow Facebook Pixel</label>

                {/* Use StatusToggle component */}
                <StatusToggle
                    initialStatus={isPixelEnabled ? "Active" : "Inactive"}
                    key={isPixelEnabled ? "active" : "inactive"}
                    onToggle={() => setIsPixelEnabled((prev) => !prev)}
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Facebook App Id</label>
                <input
                    type="text"
                    value={appId}
                    onChange={(e) => setAppId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Update
            </button>
        </div>
    );
};

export default FacebookPixel;
