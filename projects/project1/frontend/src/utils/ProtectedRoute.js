import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";

const ProtectedRoute = ({ path, element, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to unauthorized page if user's role is not allowed
    return <Navigate to="/unauthorized" />;
  }

  return <Route path={path} element={element} />;
};

export default ProtectedRoute;
