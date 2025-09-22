import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  LayoutGrid,
} from "lucide-react";
import Title from "./Title";
import { FaBlog, FaHome, FaUserAlt } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { RiFilePaper2Fill } from "react-icons/ri";

const SidebarLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openPages, setOpenPages] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openBlogs, setOpenBlogs] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const menu = [
    { name: "Dashboard", path: "/", icon: <FaHome size={18} /> },
    { name: "Users", path: "/users", icon: <FaUserAlt size={18} /> },
    { name: "Setting", path: "/settings", icon: <IoSettingsSharp size={18} /> },
    { name: "Categories", path: "/categories", icon: <LayoutGrid size={18} /> },
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
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <aside
        className={`max-md:hidden ${sidebarOpen ? "w-64" : "w-16"
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
                  title={!sidebarOpen ? item.name : ""}
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

            {/* Pages Dropdown */}
            <li className="mb-3">
              <button
                onClick={() => setOpenPages(!openPages)}
                disabled={!sidebarOpen}
                title={!sidebarOpen ? "Pages" : ""}
                className={`flex items-center justify-between text-sm w-full px-2 py-2 rounded transition ${location.pathname.startsWith("/pages")
                    ? "bg-gray-200 text-[#6777EF]"
                    : "hover:bg-gray-200"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <RiFilePaper2Fill size={18} />
                  <span>{sidebarOpen && "Pages"}</span>
                </div>
                {openPages ? (
                  <ChevronDown className={`${!sidebarOpen && 'hidden'}`} size={16} />
                ) : (
                  <ChevronRight className={`${!sidebarOpen && 'hidden'}`} size={16} />
                )}
              </button>

              {openPages && (
                <ul className="ml-6 mt-2">
                  {pagesMenu.map((p) => (
                    <li key={p.id} className="mb-2">
                      <Link
                        to={p.path}
                        className={`block px-3 py-1 rounded text-sm transition ${location.pathname === p.path
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

            {/* Blogs Dropdown */}
            <li className="mb-3">
              <button
                onClick={() => setOpenBlogs(!openBlogs)}
                disabled={!sidebarOpen}
                title={!sidebarOpen ? "Blogs" : ""}
                className={`flex items-center justify-between w-full px-2 py-2 rounded transition ${location.pathname.startsWith("/blogs")
                    ? "bg-gray-200 text-[#6777EF]"
                    : "hover:bg-gray-200"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <FaBlog size={18}/>
                  <span>{sidebarOpen && "Blogs"}</span>
                </div>
                {openBlogs ? (
                  <ChevronDown className={`${!sidebarOpen && 'hidden'}`} size={16} />
                ) : (
                  <ChevronRight className={`${!sidebarOpen && 'hidden'}`} size={16} />
                )}
              </button>

              {openBlogs && (
                <ul className="ml-6 mt-2">
                  {blogsMenu.map((b) => (
                    <li key={b.id} className="mb-2">
                      <Link
                        to={b.path}
                        className={`block px-3 py-1 rounded text-sm transition ${location.pathname === b.path
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

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-[45] bg-transparent bg-opacity-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-full z-50 bg-white text-black flex flex-col transition-all duration-400 ${mobileMenuOpen ? "w-[80vw] p-2" : "w-0 overflow-hidden"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold mx-auto">
            {mobileMenuOpen ? "Admin Panel" : "AP"}
          </h2>
          {mobileMenuOpen && (
            <X
              className="text-black cursor-pointer"
              size={28}
              onClick={() => setMobileMenuOpen(false)}
            />
          )}
        </div>

        <nav className="flex-1">
          <ul>
            {menu.map((item) => (
              <li key={item.path} className="mb-3">
                <Link
                  to={item.path}
                  title={!mobileMenuOpen ? item.name : ""}
                  className={`flex items-center gap-2 px-2 py-2 rounded transition ${location.pathname === item.path
                      ? "bg-gray-200 text-[#6777EF]"
                      : "hover:bg-gray-200 text-black"
                    }`}
                >
                  <span>{item.icon}</span>
                  <span>{mobileMenuOpen && item.name}</span>
                </Link>
              </li>
            ))}

            {/* Mobile Pages Dropdown */}
            <li className="mb-3">
              <button
                onClick={() => setOpenPages(!openPages)}
                disabled={!mobileMenuOpen}
                title={!mobileMenuOpen ? "Pages" : ""}
                className={`flex items-center justify-between text-sm w-full px-2 py-2 rounded transition ${location.pathname.startsWith("/pages")
                    ? "bg-gray-200 text-[#6777EF]"
                    : "hover:bg-gray-200"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <RiFilePaper2Fill />
                  <span>{mobileMenuOpen && "Pages"}</span>
                </div>
                {mobileMenuOpen &&
                  (openPages ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  ))}
              </button>

              {openPages && mobileMenuOpen && (
                <ul className="ml-6 mt-2">
                  {pagesMenu.map((p) => (
                    <li key={p.id} className="mb-2">
                      <Link
                        to={p.path}
                        className={`block px-3 py-1 rounded text-sm transition ${location.pathname === p.path
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

            {/* Mobile Blogs Dropdown */}
            <li className="mb-3">
              <button
                onClick={() => setOpenBlogs(!openBlogs)}
                disabled={!mobileMenuOpen}
                title={!mobileMenuOpen ? "Blogs" : ""}
                className={`flex items-center justify-between w-full px-2 py-2 rounded transition ${location.pathname.startsWith("/blogs")
                    ? "bg-gray-200 text-[#6777EF]"
                    : "hover:bg-gray-200"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <FaBlog />
                  <span>{mobileMenuOpen && "Blogs"}</span>
                </div>
                {mobileMenuOpen &&
                  (openBlogs ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  ))}
              </button>

              {openBlogs && mobileMenuOpen && (
                <ul className="ml-6 mt-2">
                  {blogsMenu.map((b) => (
                    <li key={b.id} className="mb-2">
                      <Link
                        to={b.path}
                        className={`block px-3 py-1 rounded text-sm transition ${location.pathname === b.path
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
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-[95%] z-40">
            <Title />
          </div>

          {/* Desktop Sidebar Toggle */}
          <Menu
            className="max-md:hidden text-white cursor-pointer"
            size={28}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />

          {/* Mobile Menu Open Icon */}
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

        {/* Page Content */}
        <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
