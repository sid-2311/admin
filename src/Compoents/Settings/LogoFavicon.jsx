import { useState } from "react";

const LogoFavicon = () => {
    const [formData, setFormData] = useState({
        logo: null,
        footerLogo: null,
        favicon: null,
    });

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prev) => ({ ...prev, [name]: files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Uploaded Files:", formData);
        alert("Logos & Favicon Updated ✅");
    };

    const placeholder = "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";

    const fileUploadStyle = "w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer";

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 text-[#34395E] rounded-lg space-y-6"
        >
            {/* Logo */}
            <div>
                <label className="block mb-2 font-medium">Existing Logo</label>
                <img
                    src={formData.logo ? URL.createObjectURL(formData.logo) : placeholder}
                    alt="Logo Preview"
                    className="h-12 mb-3 border rounded"
                />
                <p className="mb-2">New Logo</p>
                <input
                    type="file"
                    name="logo"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={fileUploadStyle}
                />
            </div>

            {/* Footer Logo */}
            <div>
                <label className="block mb-2 font-medium">Footer Logo</label>
                <img
                    src={
                        formData.footerLogo
                            ? URL.createObjectURL(formData.footerLogo)
                            : placeholder
                    }
                    alt="Footer Logo Preview"
                    className="h-12 mb-3 border rounded"
                />
                <p className="mb-2">New Logo</p>
                <input
                    type="file"
                    name="footerLogo"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={fileUploadStyle}
                />
            </div>

            {/* Favicon */}
            <div>
                <label className="block mb-2 font-medium">Existing Favicon</label>
                <img
                    src={
                        formData.favicon
                            ? URL.createObjectURL(formData.favicon)
                            : placeholder
                    }
                    alt="Favicon Preview"
                    className="h-12 w-12 mb-3 border rounded"
                />
                <p className="mb-2">New Favicon</p>
                <input
                    type="file"
                    name="favicon"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={fileUploadStyle}
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
};

export default LogoFavicon;
