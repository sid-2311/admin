import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const SidebarLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openPages, setOpenPages] = useState(false);

  const menu = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={18} /> },
    { name: "Users", path: "/users", icon: <Users size={18} /> },
    { name: "Setting", path: "/settings", icon: <Settings size={18} /> },
  ];

  // Submenu for Pages
  const pagesMenu = [
    { id: 1, name: "Landing Page", path: "/pages/1" },
    { id: 2, name: "About Us Page", path: "/pages/about-us" },
    { id: 3, name: "Contact Page", path: "/pages/3" },
  ];

  const handleLogout = () => {
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-black p-5 flex flex-col border-r">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex-1">
          <ul>
            {/* Normal Menu */}
            {menu.map((item) => (
              <li key={item.path} className="mb-3">
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded transition ${
                    location.pathname === item.path
                      ? "bg-gray-200"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}

            {/* Pages with Dropdown */}
            <li className="mb-3">
              <button
                onClick={() => setOpenPages(!openPages)}
                className={`flex items-center justify-between w-full px-4 py-2 rounded transition ${
                  location.pathname.startsWith("/pages")
                    ? "bg-gray-200"
                    : "hover:bg-gray-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileText size={18} />
                  <span>Pages</span>
                </div>
                {openPages ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>

              {openPages && (
                <ul className="ml-6 mt-2">
                  {pagesMenu.map((p) => (
                    <li key={p.id} className="mb-2">
                      <Link
                        to={p.path}
                        className={`block px-3 py-1 rounded text-sm transition ${
                          location.pathname === p.path
                            ? "bg-gray-200"
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
          </ul>
        </nav>

       
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#6777EF] shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl text-white font-semibold capitalize">
            {location.pathname === "/"
              ? "Dashboard"
              : location.pathname.replace("/", "")}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-white">Welcome, Admin</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
