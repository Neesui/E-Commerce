import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./components/userComponent/Layout";
import Homepage from "./pages/userpages/Homepage";
import Product from "./pages/userpages/Product";
import Login from './pages/userpages/Login';
import Register from "./pages/userpages/Register";
import CartPage from "./components/usercomponents/CartPage";

import AdminLayout from "./components/admincomponents/AdminLayout";
import Dashboard from "./pages/adminpages/Dashboard";
import Addproduct from "./pages/adminpages/Addproduct";
import ProductList from "./pages/adminpages/ProductList";
import AddCategory from "./pages/adminpages/AddCategory";
import CategoryList from "./pages/adminpages/CategoryList";

const Myroute = () => {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="cart" element={<CartPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="addproduct" element={<Addproduct />} />
          <Route path="productlist" element={<ProductList />} />
          <Route path="addcategory" element={<AddCategory />} />
          <Route path="categorylist" element={<CategoryList />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Myroute;
