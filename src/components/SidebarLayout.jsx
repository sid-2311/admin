import { useEffect, useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { RiFilePaper2Fill } from "react-icons/ri";
import { FaHome, FaUserAlt, FaBlog } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { LayoutGrid } from "lucide-react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { loadNavbars } from "../store/navbarSlice";

const SidebarLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const dispatch = useDispatch();
  const navbarState = useSelector((s) => s.navbar);

  useEffect(() => {
    if (!navbarState.data.length && !navbarState.loading) {
      dispatch(loadNavbars());
    }
  }, []);

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

  // Reusable Sidebar Item
  const SidebarItem = ({ item }) => (
    <li>
      <Link
        to={item.path}
        title={item.name}
        className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${location.pathname === item.path
            ? "bg-indigo-50 text-[#6777EF]"
            : "hover:bg-gray-100 text-gray-600"
          }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <span>{item.icon}</span>
        {sidebarOpen && <span>{item.name}</span>}
      </Link>
    </li>
  );

  // Pages Dropdown
  const PagesDropdown = () => (
    <li>
      <button
        onClick={() =>
          setOpenCategory(openCategory === "Pages" ? null : "Pages")
        }
        className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition ${location.pathname.startsWith("/pages")
            ? "bg-indigo-50 text-[#6777EF]"
            : "hover:bg-gray-100 text-gray-600"
          }`}
      >
        <span className="flex items-center gap-2">
          <RiFilePaper2Fill size={18} className="text-gray-600" />
          {sidebarOpen && <span>Pages</span>}
        </span>
        {sidebarOpen &&
          (openCategory === "Pages" ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronRight size={16} />
          ))}
      </button>

      {sidebarOpen && openCategory === "Pages" && (
        <ul className="ml-8 mt-2 space-y-1">
          {navbarState.data.map((cat) => (
            <li key={cat._id}>
              <button
                className={`w-full text-left px-2 py-1 rounded transition ${location.pathname === "/pages"
                    ? "bg-indigo-50 text-[#6777EF]"
                    : "hover:bg-gray-50 text-gray-600"
                  }`}
                onClick={() => {
                  navigate("/pages", { state: { selectedCategory: cat._id } });
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

  // Blogs Dropdown
  const BlogsDropdown = () => (
    <li>
      <button
        onClick={() =>
          setOpenCategory(openCategory === "Blogs" ? null : "Blogs")
        }
        className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition ${location.pathname.startsWith("/blogs")
            ? "bg-indigo-50 text-[#6777EF]"
            : "hover:bg-gray-100 text-gray-600"
          }`}
      >
        <span className="flex items-center gap-2">
          <FaBlog size={18} className="text-gray-600" />
          {sidebarOpen && <span>Blogs</span>}
        </span>
        {sidebarOpen &&
          (openCategory === "Blogs" ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronRight size={16} />
          ))}
      </button>

      {sidebarOpen && openCategory === "Blogs" && (
        <ul className="ml-8 mt-2 space-y-1">
          {blogsMenu.map((blog) => (
            <li key={blog.path}>
              <button
                className={`w-full text-left px-2 py-1 rounded transition ${location.pathname === blog.path
                    ? "bg-indigo-50 text-[#6777EF]"
                    : "hover:bg-gray-50 text-gray-600"
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
        className={`hidden md:flex flex-col overflow-y-auto transition-all duration-300 ${sidebarOpen ? "w-64" : "w-16"
          } bg-white border-r shadow-sm z-40`}
      >
        <h2 className="text-lg font-bold mb-6 text-center text-[#6777EF]">
          {sidebarOpen ? "Admin Panel" : "AP"}
        </h2>
        <nav className="flex-1">
          <ul className="space-y-1">
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
          className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      {/* Mobile Sidebar */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-full z-[100] bg-white shadow-lg transform transition-transform duration-300
    ${mobileMenuOpen ? "translate-x-0 w-[80vw]" : "-translate-x-full w-[80vw]"}`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold text-[#6777EF]">Admin Panel</h2>
          <X
            className="text-gray-600 cursor-pointer"
            size={24}
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>
        <nav className="flex-1 p-2 overflow-y-auto">
          <ul className="space-y-1">
            {menu.map((item, idx) => (
              <SidebarItem key={idx} item={item} />
            ))}
            <PagesDropdown />
            <BlogsDropdown />
          </ul>
        </nav>
      </aside>


      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header fixed on top */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        {/* Add pt-20 so content doesn't overlap header */}
        <main className="flex-1 bg-gray-50 p-4 md:p-6 overflow-y-auto pt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
