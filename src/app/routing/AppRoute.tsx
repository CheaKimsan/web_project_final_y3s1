import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import AppLayout from "../../_stock_management/layout/AppLayout";
import Settings from "../modules/setting/Settings";
import Dashboard from "../modules/shipping/Dashboard";
import User from "../modules/users/User";
import Categories from "../modules/categories/Categories";
import Product from "../modules/product/Product";
import LoginPage from "../modules/auth/login/LoginPage";
import { AuthProvider } from "../modules/auth/AuthContext";
import PrivateRoute from "./PrivateRoute"; // import the private route

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public login route */}
          <Route path="/auth" element={<LoginPage />} />

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
            <Route index element={<Dashboard />} />
            <Route path="users" element={<User />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<Product />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
