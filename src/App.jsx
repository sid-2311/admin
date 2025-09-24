import { Routes, Route, Navigate } from "react-router-dom";
import SidebarLayout from "./Compoents/SidebarLayout"
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Pages from "./pages/Pages";
// import AboutusPagess from "./pages/page";
// import Whytochoose from "./pages/Whytochooseus";
// import ContactUs from "./pages/ContactUs";

// import Whytochoose from "./pages/Whytochooseus";
import BlogCategory from "./pages/BlogCategory";
import BlogCategoryForm from "./pages/CreateBlog";
import BlogEditPage from "./pages/EditBlog";
import Blogs from "./pages/Blogs";
import BlogForm from "./pages/BlogCreate";
import BlogEditForm from "./pages/BlogEdit";
import PopularBlog from "./pages/PopularBlog";
import BlogComment from "./pages/BlogComment";
import ProfileForm from "./pages/Profile";
import Category from "./pages/Category";
// import SoftwarePage from "./Compoents/Software/SoftwarePage";


function App(){
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    // Update localStorage when authentication changes
    localStorage.setItem("isAuthenticated", isAuthenticated ? "true" : "false");
  }, [isAuthenticated]);

  return(
    <Routes>
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />


        {isAuthenticated ? (
        <Route path="/" element={<SidebarLayout />}>
          <Route index element={<Dashboard/>}/>
           <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />}/>
            <Route path="pages" element={<Pages />} />
            {/* <Route path="pages/about-us" element={<AboutusPagess/>}/> */}
              {/* <Route path="/pages/software" element={<SoftwarePage/>}/> */}

              {/* <Route path="pages/contact-us" element={<ContactUs/>}/> */}
              {/* <Route path="/pages/about-us/why-choose-us" element={<Whytochoose/>}/> */}
            {/* </Route> */}
          {/* <Route index element={<Dashboard />} /> */}
         <Route path="/blogs/categories" element={<BlogCategory/>}/>
         <Route path="/createBlog" element={<BlogCategoryForm/>}/>
         <Route path="/editblog" element={<BlogEditPage/>}/>
         <Route path="/blogs/create" element={<Blogs/>}/>
          <Route path="/BlogCreate" element={<BlogForm/>}/>
          <Route path="/BlogEdit" element={<BlogEditForm/>}/>
          <Route path="/blogs/popular" element={<PopularBlog/>}/>
          <Route path="/blogs/comments" element={<BlogComment/>}/>
          <Route path="/profile" element={<ProfileForm/>}/>
          <Route path ="/Categories" element={<Category/>}/>
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  )
}
export default App