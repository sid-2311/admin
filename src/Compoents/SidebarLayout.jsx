import {Outlet,Link,useLocation,useNavigate } from "react-router-dom"

const SidebarLayout=()=>{
    const location =useLocation()
    const navigate=useNavigate()


    const menu =[
        {name : "Dashboard", path: "/"},
        {name :"Users" , path:"/users"},
        {name :"Setting", path:"/settings"},
        {name :"Pages", path:"/pages"}
    ]

const handleLogout=()=>{
    navigate("/login")

    window.location.reload()
}

return(
    
      <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex-1">
          <ul>
            {menu.map((item) => (
              <li key={item.path} className="mb-3">
                <Link
                  to={item.path}
                  className={`block px-4 py-2 rounded transition ${
                    location.pathname === item.path
                      ? "bg-gray-700"
                      : "hover:bg-gray-800"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-600 py-2 px-4 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
)
}

export default SidebarLayout