import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import LoadingSpinner from "../Components/Spinner/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;
  if (!user)
    return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
};

export default PrivateRoute;
