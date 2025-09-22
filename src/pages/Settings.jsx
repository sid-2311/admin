import { useState } from "react";
import GeneralSettings from "../Compoents/Settings/GeneralSettings";
import LogoFavicon from "../Compoents/Settings/LogoFavicon";
import CookieConsent from "../Compoents/Settings/CookieConsent";
import GoogleAnalyticsForm from "../Compoents/Settings/GoogleAnalytic";
import FacebookPixel from "../Compoents/Settings/FacebookPixel";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general-setting");

  const renderContent = () => {
    switch (activeTab) {
      case "general-setting":
        return <GeneralSettings />;
      case "logo-favicon":
        return <LogoFavicon />;
      case "cookie-consent":
        return <CookieConsent />;
      case "google-analytic":
        return <GoogleAnalyticsForm />;
      case "social-login":
        return <div className="p-6">🔒 Social Login Content</div>;
      case "facebook-pixel":
        return <FacebookPixel />;
      default:
        return <div className="p-6">Select a tab</div>;
    }
  };

  return (

    <div className="flex max-md:flex-col bg-white mt-10 rounded p-6 gap-4">
      {/* Sidebar */}
      <div className="w-full md:w-60">
        {/* <h2 className="text-xl font-bold p-4 border-b">⚙️ Settings</h2> */}
        <ul>
          {[
            { id: "general-setting", label: "General Setting" },
            { id: "logo-favicon", label: "Logo and Favicon" },
            { id: "cookie-consent", label: "Cookie Consent" },
            { id: "google-analytic", label: "Google Analytic" },
            // { id: "custom-pagination", label: "Custom Pagination" },
            { id: "social-login", label: "Social Login" },
            { id: "facebook-pixel", label: "Facebook Pixel" },
          ].map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-2.5 rounded my-2 border border-gray-300 transition-all duration-300 cursor-pointer ${activeTab === tab.id ? "bg-[#6777EF] text-white font-semibold" : "hover:bg-gray-200 text-[#6777EF]"
                  }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 border border-gray-200 m-2 rounded-lg">
        {renderContent()}
      </div>
    </div>
  );
};

export default Settings;
