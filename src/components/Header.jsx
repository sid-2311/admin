// Header component for admin panel top bar
// एडमिन पैनल का टॉप बार हेडर
import { Menu, ChevronDown, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Title from "./Title";

const Header = ({ sidebarOpen, setSidebarOpen, mobileMenuOpen, setMobileMenuOpen }) => {
  // State for profile dropdown
  // प्रोफाइल ड्रॉपडाउन के लिए स्टेट
  const [openProfile, setOpenProfile] = useState(false);
  const navigate = useNavigate();

  // Logout handler
  // लॉगआउट हैंडलर
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <header className="h-20 bg-[#6777EF] shadow flex items-center justify-between px-4 md:px-8 relative">
      {/* Center Title - पेज का टाइटल सेंटर में */}
      <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 w-[95%] z-40">
        <Title />
      </div>

      {/* Desktop Sidebar Toggle - डेस्कटॉप साइडबार टॉगल */}
      <Menu
        className="hidden md:block text-white cursor-pointer hover:text-blue-200 transition"
        size={28}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        title="Toggle Sidebar"
      />

      {/* Mobile Menu Toggle - मोबाइल मेनू टॉगल */}
      {!mobileMenuOpen && (
        <Menu
          className="md:hidden text-white cursor-pointer hover:text-blue-200 transition"
          size={28}
          onClick={() => setMobileMenuOpen(true)}
          title="Open Menu"
        />
      )}

      {/* Right Side - राइट साइड प्रोफाइल और वेलकम */}
      <div className="flex items-center gap-4">
        <span className="text-white hidden sm:inline text-base font-medium tracking-wide">Welcome, Admin</span>

        {/* Profile Dropdown - प्रोफाइल ड्रॉपडाउन */}
        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setOpenProfile(!openProfile)}
            title="Profile Menu"
          >
            <img
              src="https://via.placeholder.com/40"
              alt="profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md group-hover:border-blue-200 transition"
            />
            <span className="text-white hidden sm:inline font-semibold">Admin</span>
            <ChevronDown className="text-white group-hover:text-blue-200 transition" size={18} />
          </div>

          {openProfile && (
            <div className="absolute right-0 mt-2 z-50 bg-white rounded-xl shadow-lg w-44 border border-blue-100">
              <ul className="flex flex-col">
                <li
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700 font-medium rounded-t-xl"
                  onClick={() => navigate("/profile")}
                >
                  {/* View Profile - प्रोफाइल देखें */}
                  View Profile
                </li>
                <li
                  className="px-4 py-2 text-red-500 hover:bg-blue-50 cursor-pointer font-medium rounded-b-xl"
                  onClick={handleLogout}
                >
                  {/* Logout - लॉगआउट */}
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
