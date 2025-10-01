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
        <div className="mx-auto p-6  text-[#34395E]">
            <div className="mb-6">
                <label className="block font-semibold mb-2">Allow Facebook Pixel</label>

                {/* Use StatusToggle component */}
                <StatusToggle
                    initialStatus={isPixelEnabled ? "Active" : "Inactive"}
                    key={isPixelEnabled ? "active" : "inactive"}
                    onToggle={() => setIsPixelEnabled((prev) => !prev)}
                />
            </div>

            <div className="mb-6">
                <label className="block font-semibold mb-2">Facebook App Id</label>
                <input
                    type="text"
                    value={appId}
                    onChange={(e) => setAppId(e.target.value)}
                    className="w-full px-4 py-2 text-[#495057] border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#95A0F4]"
                />
            </div>

            <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
            >
                Update
            </button>
        </div>
    );
};

export default FacebookPixel;
