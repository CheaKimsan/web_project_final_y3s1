import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../modules/auth/AuthContext"; // adjust path if needed

const PrivateRoute: React.FC = () => {
  const { user } = useAuth(); 
  if (!user) {
    // If not logged in, redirect to login page
    return <Navigate to="/auth" replace />;
  }

  // If logged in, render the child routes
  return <Outlet />;
};

export default PrivateRoute;
