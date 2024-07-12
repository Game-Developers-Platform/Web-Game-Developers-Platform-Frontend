import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: React.PropsWithChildren) => {
  const isAuthenticated = true; // Take the id from the localStorage and check if it is valid.

  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
