import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import required components
import Layout from "./components/userComponent/Layout";
import Homepage from "./pages/userpages/Homepage";

const Myroute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Myroute;
