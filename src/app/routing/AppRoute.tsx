import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "../../_stock_management/layout/AppLayout";
import Dashboard from "../modules/dashboard/Dashboard";
import Settings from "../modules/setting/Settings";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
