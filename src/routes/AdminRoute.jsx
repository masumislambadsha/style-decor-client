import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import LoadingSpinner from "../Components/Spinner/LoadingSpinner";
import Forbidden from "../Components/ForbiddenPage/Forbidden";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();
  if (loading || roleLoading) {
    return <LoadingSpinner />;
  }

  if (role !== "admin") {
    return <Forbidden />;
  }
  return children;
};

export default AdminRoute;
