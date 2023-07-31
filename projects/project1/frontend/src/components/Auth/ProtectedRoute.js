// components/Auth/ProtectedRoute.js
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const { isAuthenticated, userRole } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        // Check if the user is authenticated and has the required role
        if (isAuthenticated && allowedRoles.includes(userRole)) {
          return <Component {...props} />;
        } else {
          // Redirect to the NotAuthorized page for unauthorized access
          return <Redirect to="/not-authorized" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
