import React from "react";
import useRole from "../Hooks/useRole";
import { Navigate } from "react-router";
import LoadingSpinner from "../Components/Spinner/LoadingSpinner";

const DecoratorRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />;
  if (role !== "decorator") return <Navigate to="/dashboard" replace />;

  return children;
};

export default DecoratorRoute;
