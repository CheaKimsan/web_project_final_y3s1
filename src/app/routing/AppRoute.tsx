import {Routes, Route, BrowserRouter } from "react-router-dom";
import AppLayout from "../../_stock_management/layout/AppLayout";
import Settings from "../modules/setting/Settings";
import Dashboard from "../modules/shipping/Dashboard";
import User from "../modules/users/User";
import Categories from "../modules/categories/Categories";
import Product from "../modules/product/Product";
import LoginPage from "../modules/auth/login/LoginPage";
import { AuthProvider } from "../modules/auth/AuthContext";
import PrivateRoute from "./PrivateRoute";
import Roles from "../modules/role/Roles";
import RegisterPage from "../modules/auth/login/RegisterPage";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public login route */}
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Protected routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <AppLayout />
              </PrivateRoute>
            }
          >
            {/* Default route → Dashboard */}
            <Route path="/" element={<Dashboard />} />
            <Route path="products" element={<Product />} />
            <Route path="users" element={<User />} />
            <Route path="categories" element={<Categories />} />
x            <Route path="role" element={<Roles />}/>
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
