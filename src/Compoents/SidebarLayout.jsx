import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  LayoutGrid,
  
} from "lucide-react";
import Title from "./Title";
import { FaBlog, FaHome, FaUserAlt } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { RiFilePaper2Fill } from "react-icons/ri";
import { path } from "framer-motion/client";

const SidebarLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openPages, setOpenPages] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openBlogs, setOpenBlogs] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const menu = [
    { name: "Dashboard", path: "/", icon: <FaHome /> },
    { name: "Users", path: "/users", icon: <FaUserAlt /> },
    { name: "Setting", path: "/settings", icon: <IoSettingsSharp /> },
    {name: "Categories" ,path:"/Categories",icon: <LayoutGrid /> }
  ];

  const pagesMenu = [
    { id: 1, name: "Landing Page", path: "/pages/1" },
    { id: 2, name: "About Us Page", path: "/pages/about-us" },
    { id: 3, name: "Contact Page", path: "/pages/contact-us" },
  ];

  const blogsMenu = [
    { id: 1, name: "Categories", path: "/blogs/categories" },
    { id: 2, name: "Blogs", path: "/blogs/create" },
    { id: 3, name: "Popular Blogs", path: "/blogs/popular" },
    { id: 4, name: "Comments", path: "/blogs/comments" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false); // ✅ update parent state
    navigate("/login");
  };
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`max-md:hidden ${
          sidebarOpen ? "w-64" : "w-16"
        } bg-white text-black p-2.5 flex flex-col transition-all duration-400`}
      >
        <h2 className="text-2xl font-bold mb-6 mx-auto">
          {sidebarOpen ? "Admin Panel" : "AP"}
        </h2>
        <nav className="flex-1">
          <ul>
            {menu.map((item) => (
              <li key={item.path} className="mb-3">
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 px-2 py-2 rounded transition ${location.pathname === item.path
                    ? "bg-gray-200 text-[#6777EF]"
                    : "hover:bg-gray-200 text-black"
                    }`}
                >
                  <span>{item.icon}</span>
                  <span>{sidebarOpen && item.name}</span>
                </Link>
              </li>
            ))}

            {/* Pages with Dropdown */}
            <li className="mb-3">
              <button
                onClick={() => setOpenPages(!openPages)}
                className={`flex items-center justify-between text-sm w-full px-2 py-2 rounded transition ${location.pathname.startsWith("/pages")
                  ? "bg-gray-200 text-[#6777EF]"
                  : "hover:bg-gray-200"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <RiFilePaper2Fill />
                  <span>{sidebarOpen && "Pages"}</span>
                </div>
                {sidebarOpen &&
                  (openPages ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  ))}
              </button>

              {openPages && sidebarOpen && (
                <ul className="ml-6 mt-2">
                  {pagesMenu.map((p) => (
                    <li key={p.id} className="mb-2">
                      <Link
                        to={p.path}
                        className={`block px-3 py-1 rounded text-sm transition ${
                          location.pathname === p.path
                            ? "bg-gray-200 text-[#6777EF]"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Blogs with Dropdown */}
            <li className="mb-3">
              <button
                onClick={() => setOpenBlogs(!openBlogs)}
                disabled={!sidebarOpen}
                title={!sidebarOpen ? "Blogs" : ""}
                className={`flex items-center justify-between w-full px-4 py-2 rounded transition ${
                  location.pathname.startsWith("/blogs")
                    ? "bg-gray-200 text-[#6777EF]"
                    : "hover:bg-gray-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FaBlog />
                  <span>{sidebarOpen && "Blogs"}</span>
                </div>
                {sidebarOpen &&
                  (openBlogs ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  ))}
              </button>

              {openBlogs && sidebarOpen && (
                <ul className="ml-6 mt-2">
                  {blogsMenu.map((b) => (
                    <li key={b.id} className="mb-2">
                      <Link
                        to={b.path}
                        className={`block px-3 py-1 rounded text-sm transition ${
                          location.pathname === b.path
                            ? "bg-gray-200 text-[#6777EF]"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {b.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-28 bg-[#6777EF] shadow px-1 md:px-6 py-5 flex justify-between relative">
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-[95%] z-50">
            <Title />
          </div>
          <Menu className="text-white cursor-pointer" size={28} onClick={() => setSidebarOpen(!sidebarOpen)} />

          <div className="flex gap-4">
            <span className="text-white">Welcome, Admin</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white h-10 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
