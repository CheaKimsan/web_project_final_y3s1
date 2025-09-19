import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../modules/auth/AuthContext";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, token } = useAuth();

  if (user === undefined) {
    return null;
  }
  return user && token ? <>{children}</> : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
