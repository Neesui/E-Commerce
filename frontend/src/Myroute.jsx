import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import required components
import Layout from "./components/userComponent/Layout";
import Homepage from "./pages/userpages/Homepage";
import Product from "./pages/userpages/Product";
import Login from './pages/userpages/Login';

const Myroute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
            <Route path="register" element={<Register/>}/>
            <Route path="login" element={<Login/>}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default Myroute;
