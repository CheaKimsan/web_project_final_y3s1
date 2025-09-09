import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "../../_stock_management/layout/AppLayout";
import Settings from "../modules/setting/Settings";
import Dashboard from "../modules/shipping/Dashboard";
import User from "../modules/users/User";
import Categories from "../modules/categories/Categories";
import Product from "../modules/product/Product";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<User />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Product />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
