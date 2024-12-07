import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/userComponent/Layout";
import Homepage from "./pages/userpages/Homepage";
import Product from "./pages/userpages/Product";
import Dashboard from "./pages/adminpages/Dashoard";
import AdminHeader from "./components/adminComponent/AdminHeader";
import Addproduct from "./pages/adminpages/Addproduct";
import ProductList from "./pages/adminpages/ProductList";
import Register from "./pages/userpages/Register";
import Login from "./pages/userpages/Login";
import CartPage from "./components/userComponent/CardPage";
import AddCategory from "./pages/adminpages/AddCategory";
// import CategoryList from "./pages/adminpages/CategoryList";
import EmailVerify from "./auth/EmailVerify";
import UpdateProduct from "./pages/adminpages/UpdateProduct";
import UpdateCategory from "./pages/adminpages/UpdateCategory";
import ProductDetails from "./pages/userpages/ProductDetails";
const Myroute = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* route for user pages */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="productdetail/:productId" element={<ProductDetails />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="email/confirmation/:token" element={<EmailVerify />} />
          </Route>

          {/* route for admin pages */}
          <Route path="/admin" element={<AdminHeader />}>
            <Route index element={<Dashboard />} />
            <Route path="addproduct" element={<Addproduct />} />
            <Route path="updateproduct/:productId" element={<UpdateProduct />} />
            <Route path="productlist" element={<ProductList />} />
            {/* <Route path="categorylist" element={<CategoryList />} /> */}
            <Route path="updatecategory/:categoryId" element={<UpdateCategory />} />
            <Route path="addcategory" element={<AddCategory />} />
          
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default Myroute;