import { Outlet, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  X,
  LayoutGrid,
} from "lucide-react";
import { FaBlog, FaHome, FaUserAlt } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { RiFilePaper2Fill } from "react-icons/ri";
import Header from "./Header";

const SidebarLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  // SINGLE MENU ARRAY WITH SUBMENUS
  const menu = [
    { name: "Dashboard", path: "/", icon: <FaHome size={18} /> },
    { name: "Users", path: "/users", icon: <FaUserAlt size={18} /> },
    { name: "Setting", path: "/settings", icon: <IoSettingsSharp size={18} /> },
    { name: "Categories", path: "/categories", icon: <LayoutGrid size={18} /> },
    {
      name: "Pages",
      icon: <RiFilePaper2Fill size={18} className="text-gray-600" />,
      basePath: "/pages",
      children: [
        { id: 1, name: "Software", path: "/pages/software" },
        { id: 2, name: "About Us Page", path: "/pages/about-us" },
        { id: 3, name: "Contact Page", path: "/pages/contact-us" },
      ],
    },
    {
      name: "Blogs",
      icon: <FaBlog size={18} className="text-gray-600" />,
      basePath: "/blogs",
      children: [
        { id: 1, name: "Categories", path: "/blogs/categories" },
        { id: 2, name: "Blogs", path: "/blogs/create" },
        { id: 3, name: "Popular Blogs", path: "/blogs/popular" },
        { id: 4, name: "Comments", path: "/blogs/comments" },
      ],
    },
  ];

  const SidebarItem = ({ item }) => {
    const isOpen = openMenu === item.name;

    if (item.children) {
      return (
        <li className="mb-3">
          <button
            onClick={() => setOpenMenu(isOpen ? null : item.name)}
            disabled={!sidebarOpen && !mobileMenuOpen}
            title={!sidebarOpen && !mobileMenuOpen ? item.name : ""}
            className={`flex items-center justify-between w-full px-2 py-2 rounded transition ${
              location.pathname.startsWith(item.basePath)
                ? "bg-gray-200 text-[#6777EF]"
                : "hover:bg-gray-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {item.icon}
              {(sidebarOpen || mobileMenuOpen) && <span>{item.name}</span>}
            </div>
            {(sidebarOpen || mobileMenuOpen) &&
              (isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
          </button>

          {isOpen && (sidebarOpen || mobileMenuOpen) && (
            <ul className="ml-6 mt-2">
              {item.children.map((child) => (
                <li key={child.id} className="mb-2">
                  <Link
                    to={child.path}
                    className={`block px-3 py-1 rounded text-sm transition ${
                      location.pathname === child.path
                        ? "bg-gray-200 text-[#6777EF]"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {child.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      );
    }

    return (
      <li className="mb-3">
        <Link
          to={item.path}
          title={!sidebarOpen ? item.name : ""}
          className={`flex items-center gap-2 px-2 py-2 rounded transition ${
            location.pathname === item.path
              ? "bg-gray-200 text-[#6777EF]"
              : "hover:bg-gray-200 text-gray-600"
          }`}
        >
          <span>{item.icon}</span>
          {sidebarOpen && <span>{item.name}</span>}
        </Link>
      </li>
    );
  };

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <aside
        className={`max-md:hidden ${sidebarOpen ? "w-64" : "w-16"} 
        bg-white text-black p-2.5 flex flex-col transition-all duration-400`}
      >
        <h2 className="text-2xl font-bold mb-6 mx-auto">
          {sidebarOpen ? "Admin Panel" : "AP"}
        </h2>

        <nav className="flex-1">
          <ul>
            {menu.map((item, idx) => (
              <SidebarItem key={idx} item={item} />
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-[45] bg-black bg-opacity-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-full z-50 bg-white text-black flex flex-col transition-all duration-400 ${
          mobileMenuOpen ? "w-[80vw] p-2" : "w-0 overflow-hidden"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold mx-auto">Admin Panel</h2>
          <X
            className="text-black cursor-pointer"
            size={28}
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>

        <nav className="flex-1">
          <ul>
            {menu.map((item, idx) => (
              <SidebarItem key={idx} item={item} />
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
