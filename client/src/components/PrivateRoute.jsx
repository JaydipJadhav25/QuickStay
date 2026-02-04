// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import useAuth from "../context/useAuth";

const PrivateRoute = ({ children, ownerOnly = false }) => {
  // const { user, isOwner } = useAppContext();
  const  { isAuthenticated , role} = useAuth();

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Owner-only route
  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }


  return children;
};

export default PrivateRoute;
