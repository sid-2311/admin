import { Routes, Route, Navigate } from "react-router-dom";
import SidebarLayout from "./Compoents/SidebarLayout"
import Login from "./pages/Login";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Pages from "./pages/page";
import AboutusPagess from "./pages/page";
import Whytochoose from "./pages/Whytochooseus";
import ContactUs from "./pages/ContactUs";



function App(){
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return(
    <Routes>
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />


        {isAuthenticated ? (
        <Route path="/" element={<SidebarLayout />}>
          <Route index element={<Dashboard/>}/>
           <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />}/>
            {/* <Route path="pages"> */}
              <Route path="pages/about-us" element={<AboutusPagess/>}/>
              <Route path="pages/contact-us" element={<ContactUs/>}/>
              {/* <Route path="/pages/about-us/why-choose-us" element={<Whytochoose/>}/> */}
            {/* </Route> */}
          {/* <Route index element={<Dashboard />} /> */}
         
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  )
}
export default App