import navbarData from "../data/Metablock-Website.navbars-23-9-25.json";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { RiFilePaper2Fill } from "react-icons/ri";
import { FaHome, FaUserAlt, FaBlog } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { LayoutGrid } from "lucide-react";
import Header from "./Header";

const SidebarLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

  const menu = [
    { name: "Dashboard", path: "/", icon: <FaHome size={18} /> },
    { name: "Users", path: "/users", icon: <FaUserAlt size={18} /> },
    { name: "Setting", path: "/settings", icon: <IoSettingsSharp size={18} /> },
    { name: "Categories", path: "/categories", icon: <LayoutGrid size={18} /> },
  ];

  const blogsMenu = [
    { name: "Categories", path: "/blogs/categories" },
    { name: "Create Blog", path: "/blogs/create" },
    { name: "Popular Blogs", path: "/blogs/popular" },
    { name: "Comments", path: "/blogs/comments" },
  ];

  const SidebarItem = ({ item }) => (
    <li className="mb-3">
      <Link
        to={item.path}
        title={item.name}
        className={`flex items-center gap-2 px-2 py-2 rounded transition ${location.pathname === item.path
            ? "bg-gray-200 text-[#6777EF]"
            : "hover:bg-gray-200 text-gray-600"
          }`}
      >
        <span>{item.icon}</span>
        <span>{sidebarOpen && item.name}</span>
      </Link>
    </li>
  );

  // Only Pages dropdown, no nested dropdowns
  const PagesDropdown = () => (
    <li className="mb-3">
      <button
        onClick={() => setOpenCategory(openCategory === "Pages" ? null : "Pages")}
        className={`flex items-center justify-between w-full px-2 py-2 rounded transition ${location.pathname.startsWith("/pages")
            ? "bg-gray-200 text-[#6777EF]"
            : "hover:bg-gray-200"
          }`}
      >
        <span className="flex items-center gap-2">
          <RiFilePaper2Fill size={18} className="text-gray-600" />
          <span>Pages</span>
        </span>
        {openCategory === "Pages" ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>
      {openCategory === "Pages" && (
        <ul className="ml-6 mt-2">
          {navbarData.map((cat) => (
            <li key={cat._id.$oid} className="mb-2">
              <button
                className={`w-full text-left px-2 py-1 rounded transition ${location.pathname === "/pages"
                    ? "bg-gray-200 text-[#6777EF]"
                    : "hover:bg-gray-100"
                  }`}
                onClick={() => {
                  // Pass selected category via state
                  navigate("/pages", { state: { selectedCategory: cat._id.$oid } });
                  setOpenCategory(null);
                  setMobileMenuOpen(false);
                }}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </li>
  );

  const BlogsDropdown = () => (
    <li className="mb-3">
      <button
        onClick={() => setOpenCategory(openCategory === "Blogs" ? null : "Blogs")}
        className={`flex items-center justify-between w-full px-2 py-2 rounded transition ${location.pathname.startsWith("/blogs")
            ? "bg-gray-200 text-[#6777EF]"
            : "hover:bg-gray-200"
          }`}
      >
        <span className="flex items-center gap-2">
          <FaBlog size={18} className="text-gray-600" />
          <span>Blogs</span>
        </span>
        {openCategory === "Blogs" ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>
      {openCategory === "Blogs" && (
        <ul className="ml-6 mt-2">
          {blogsMenu.map((blog) => (
            <li key={blog.path} className="mb-2">
              <button
                className={`w-full text-left px-2 py-1 rounded transition ${location.pathname === blog.path
                    ? "bg-gray-200 text-[#6777EF]"
                    : "hover:bg-gray-100"
                  }`}
                onClick={() => {
                  navigate(blog.path);
                  setOpenCategory(null);
                  setMobileMenuOpen(false);
                }}
              >
                {blog.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </li>
  );

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <aside
        className={`max-md:hidden overflow-y-auto ${sidebarOpen ? "w-64" : "w-16"} 
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
            <PagesDropdown />
            <BlogsDropdown />
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
        className={`md:hidden fixed top-0 left-0 h-full z-50 bg-white text-black flex flex-col transition-all duration-400 ${mobileMenuOpen ? "w-[80vw] p-2" : "w-0 overflow-hidden"
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
            <PagesDropdown />
            <BlogsDropdown />
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