// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const PrivateRoute = ({ children, ownerOnly = false }) => {
  const { user, isOwner } = useAppContext();

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Owner-only route
  if (ownerOnly && !isOwner) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
