import { Routes, Route, Navigate } from "react-router-dom";
import SidebarLayout from "./Compoents/SidebarLayout"
import Login from "./pages/Login";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Pages from "./pages/page";
import AboutusPagess from "./pages/page";
// import Whytochoose from "./pages/Whytochooseus";
import ContactUs from "./pages/ContactUs";

import BlogCategory from "./pages/BlogCategory";
import BlogCategoryForm from "./pages/CreateBlog";
import BlogEditPage from "./pages/EditBlog";
import Blogs from "./pages/Blogs";
import BlogForm from "./pages/BlogCreate";
import BlogEditForm from "./pages/BlogEdit";


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
         <Route path="/blogs/categories" element={<BlogCategory/>}/>
         <Route path="/createBlog" element={<BlogCategoryForm/>}/>
         <Route path="/editblog" element={<BlogEditPage/>}/>
         <Route path="/blogs/create" element={<Blogs/>}/>
          <Route path="/BlogCreate" element={<BlogForm/>}/>
          <Route path="/BlogEdit" element={<BlogEditForm/>}/>
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  )
}
export default App