import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
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
  const [pagesChildren, setPagesChildren] = useState(null);
  // Structured navbar data from API for later edit/delete operations
  const [navbarData, setNavbarData] = useState(null);
  const [menuError, setMenuError] = useState(null);

  useEffect(() => {
    // Purpose: fetch navbar documents from backend and prepare two things:
    // 1) `navbarData` -> full structured data for edit/delete operations
    // 2) `pagesChildren` -> flattened array used by the sidebar menu
    //
    // उद्देश्य: बैकएंड से navbar डॉक्यूमेंट लाना और दो चीजें तैयार करना:
    // 1) `navbarData` -> सम्पूर्ण संरचित डेटा (edit/delete के लिए)
    // 2) `pagesChildren` -> साइडबार मेनू में उपयोग के लिए समतल सूची

    // Read base URL from Vite's import.meta.env when available.
    // Use try/catch so referencing `import.meta` doesn't throw in environments
    // that don't support it. As a fallback check `process.env` (node tests).
    //
    // Vite/Browser में `import.meta.env` उपलब्ध है — इसलिए पहले वहीं देखें।
    // अगर संदर्भ नहीं मिलता तो try/catch में फंसने से बचने के लिए fallback है।
    let base = "";
    try {
      base = (import.meta && import.meta.env && import.meta.env.NEXT_PUBLIC_BASE_URL) || "";
    } catch (e) {
      // In some test/node environments `import.meta` may not exist; use process.env.
      // कुछ node/test वातावरण में `import.meta` नहीं होता; तब `process.env` देखें।
      if (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_BASE_URL) {
        base = process.env.NEXT_PUBLIC_BASE_URL;
      }
    }

    // Normalize base (remove trailing slash) and build API URL.
    // Trailing slash हटाकर URL में दो बार स्लैश बनने से बचाते हैं।
    const url = `${base.replace(/\/$/, '')}/api/navbar`;
    console.log("Fetching navbar from", url);

    // Cancellation flag for cleanup to avoid setting state on unmounted component.
    // Cleanup पर fetch पूरा होने के बाद state सेट न हो, इसके लिए flag रखते हैं।
    let cancelled = false;

    // Fetch navbar documents. Standard fetch + ok-check + json parsing.
    // अगर HTTP status ठीक नहीं है तो error फेंक देते हैं ताकि catch ब्लॉक हैंडल करे।
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;

        // Backend may return a single document or an array. Normalize to array.
        // Backend एक डॉक्यूमेंट या array दोनों दे सकता है — हमेशा array बना लें।
        const docs = Array.isArray(data) ? data : [data];

        // Map backend documents to a simpler, predictable structure used in UI.
        // ID extraction handles both { _id: { $oid: '...' } } and plain values.
        // Hindi: _id में अलग-अलग ढांचे आ सकते हैं, इसलिए दोनों cases संभालते हैं।
        const mapped = docs.map((doc) => {
          const id = doc._id && (doc._id.$oid || doc._id) ? (doc._id.$oid || doc._id) : doc._id;
          const name = doc.name || '';
          const slug = doc.slug || '';
          const index = doc.index || null;
          const status = typeof doc.status === 'boolean' ? doc.status : true;

          // Normalize subcategories and their inner items into consistent arrays
          // so the frontend doesn't need to handle many shapes.
          // Hindi: subcategories और items को हमेशा array में बदल दें।
          const subcategories = Array.isArray(doc.subcategories)
            ? doc.subcategories.map((sub) => {
                const subId = sub._id && (sub._id.$oid || sub._id) ? (sub._id.$oid || sub._id) : sub._id;
                const items = Array.isArray(sub.items)
                  ? sub.items.map((it) => ({
                      id: it._id && (it._id.$oid || it._id) ? (it._id.$oid || it._id) : it._id,
                      name: it.name || '',
                      slug: it.slug || '',
                    }))
                  : [];
                return {
                  id: subId,
                  name: sub.name || '',
                  slug: sub.slug || '',
                  items,
                };
              })
            : [];

          return { id, name, slug, index, status, subcategories };
        });

        // Save the full structured data for admin operations (edit/delete etc.).
        // ध्यान दें: setState asynchronous है — तुरंत `navbarData` लॉग करने पर पुराना मान दिख सकता है।
        setNavbarData(mapped);
        console.log("Navbar Data (state variable, may be stale immediately):", navbarData);
        console.log('Mapped navbarData (computed):', mapped);

        // Build `pagesChildren` from top-level navbar documents (Website, Software, Metaverse etc.).
        // Requirement: use the main document's `name` and, if it has a `slug`, expose that
        // as the route path. This avoids using deep subcategory arrays for the sidebar list.
        //
        // Hindi: pagesChildren को subcategories के बजाय top-level डॉक्यूमेंट्स से बनाएं
        // (जैसे Website, Software, Metaverse). अगर top-level डॉक्यूमेंट में `slug` है
        // तो वही path में भेजें, वरना path खाली ना रहें — हम `/pages/<slug>` नहीं बनायेंगे
        // जब slug मौजूद न हो।
        // Include all top-level docs. Keep `path` null if slug missing so UI can
        // show them as non-clickable labels.
        // Hindi: slug न होने पर भी डॉक्यूमेंट दिखाने के लिए path null रखें —
        // UI बाद में इसे non-clickable label के रूप में रेंडर करेगा।
        const pages = mapped.map((doc, idx) => {
          const id = doc.id || (doc._id ? doc._id : idx + 1);
          const name = doc.name || `Page ${idx + 1}`;
          const path = `${doc.name}`;
          return { id, name, path };
        });

        setPagesChildren(pages.length ? pages : []);
      })
      .catch((err) => {
        if (cancelled) return;
        // On error clear derived states and expose a friendly message.
        // Hindi: त्रुटि पर UI को साफ रखें और उपयोगकर्ता को संदेश दें।
        console.error('Failed to load navbar:', err);
        setMenuError(err.message || 'Failed to load');
        setPagesChildren([]);
        setNavbarData(null);
      });

    // Cleanup: mark cancelled so pending promises don't call setState.
    // Cleanup: unmounted होने पर state अपडेट रोकने के लिए flag true करें।
    return () => {
      cancelled = true;
    };
  }, []);
console.log("Pages Children:", pagesChildren);

  const menu = [
    { name: "Dashboard", path: "/", icon: <FaHome size={18} /> },
    { name: "Users", path: "/users", icon: <FaUserAlt size={18} /> },
    { name: "Setting", path: "/settings", icon: <IoSettingsSharp size={18} /> },
    { name: "Categories", path: "/categories", icon: <LayoutGrid size={18} /> },
    {
      name: "Pages",
      icon: <RiFilePaper2Fill size={18} className="text-gray-600" />,
      basePath: "/serviceType",
      children: pagesChildren 
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
                  {child.path ? (
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
                  ) : (
                    <div className="block px-3 py-1 rounded text-sm text-gray-500">
                      {child.name}
                    </div>
                  )}
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
