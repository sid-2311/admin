import { Menu, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Title from "./Title";

const Header = ({ sidebarOpen, setSidebarOpen, mobileMenuOpen, setMobileMenuOpen }) => {
  const [openProfile, setOpenProfile] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <header className="h-28 bg-[#6777EF] shadow px-1 md:px-6 py-5 flex justify-between relative">
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-[95%] z-40">
        <Title />
      </div>

      {/* Desktop Sidebar Toggle */}
      <Menu
        className="max-md:hidden text-white cursor-pointer"
        size={28}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Mobile Menu Toggle */}
      {!mobileMenuOpen && (
        <Menu
          className="md:hidden text-white cursor-pointer"
          size={28}
          onClick={() => setMobileMenuOpen(true)}
        />
      )}

      <div className="flex items-center gap-4">
        <span className="text-white">Welcome, Admin</span>

        {/* Profile Dropdown */}
        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setOpenProfile(!openProfile)}
          >
            <img
              src="https://via.placeholder.com/40"
              alt="profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
            />
            <span className="text-white">Admin</span>
            <ChevronDown className="text-white" size={18} />
          </div>

          {openProfile && (
            <div className="absolute right-0 mt-2 z-50 bg-white rounded shadow-md w-40">
              <ul className="flex flex-col">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  View Profile
                </li>
                <li
                  className="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
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
