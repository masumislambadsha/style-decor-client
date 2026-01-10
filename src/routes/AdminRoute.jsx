import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import LoadingSpinner from "../Components/Spinner/LoadingSpinner";
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, roleLoading] = useRole();
  const location = useLocation();
  if (loading || roleLoading) {
     return (
      <LoadingSpinner/>
    );
  }
  if (!user || role !== "admin") {
    return (
      <Navigate
        to="/forbidden"
        state={{ from: location }}
        replace
      />
    );
  }
  return children;
};
export default AdminRoute;