import React from "react";
import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../layouts/RootLayout/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";

import Home from "../pages/Home/Home";
import Services from "../pages/Services/Services";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import ErrorPage from "../Components/Error/ErrorPage";

import UserDashboard from "../layouts/DashboardLayout/Dashboard/UserDashboard/UserDashboard";
import MyBookings from "../layouts/DashboardLayout/Dashboard/MyBookings/MyBookings";
import PaymentHistory from "../layouts/DashboardLayout/Dashboard/PaymentHistory/PaymentHistory";
import UserProfile from "../layouts/DashboardLayout/Dashboard/UserProfile/UserProfile";

import AdminDashboard from "../layouts/DashboardLayout/AdminDashboard/AdminDashboard.JSX";
import ManageServices from "../layouts/DashboardLayout/AdminDashboard/ManageServices/ManageServices";
import ManageDecorators from "../layouts/DashboardLayout/AdminDashboard/ManageDecorators/ManageDecorators";
import ManageBookings from "../layouts/DashboardLayout/AdminDashboard/ManageBookings/ManageBookings";
import Analytics from "../layouts/DashboardLayout/AdminDashboard/Analytics/Analytics";

import DecoratorDashboard from "../layouts/DashboardLayout/DecoratorDashboard/DecoratorDashboard";
import AssignedProjects from "../layouts/DashboardLayout/DecoratorDashboard/AssignedProjects/AssignedProjects";
import TodaySchedule from "../layouts/DashboardLayout/DecoratorDashboard/TodaySchedule/TodaySchedule";
import Earnings from "../layouts/DashboardLayout/DecoratorDashboard/Earnings/Earnings";

import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import DecoratorRoute from "./DecoratorRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/services", element: <Services /> },
      { path: "/services/:id", element: <ServiceDetails /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <UserDashboard /> },
      { path: "my-bookings", element: <MyBookings /> },
      { path: "payment-history", element: <PaymentHistory /> },
      { path: "profile", element: <UserProfile /> },

      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: "admin/services",
        element: (
          <AdminRoute>
            <ManageServices />
          </AdminRoute>
        ),
      },
      {
        path: "admin/decorators",
        element: (
          <AdminRoute>
            <ManageDecorators />
          </AdminRoute>
        ),
      },
      {
        path: "admin/bookings",
        element: (
          <AdminRoute>
            <ManageBookings />
          </AdminRoute>
        ),
      },
      {
        path: "admin/analytics",
        element: (
          <AdminRoute>
            <Analytics />
          </AdminRoute>
        ),
      },

      {
        path: "decorator",
        element: (
          <DecoratorRoute>
            <DecoratorDashboard />
          </DecoratorRoute>
        ),
      },
      {
        path: "decorator/projects",
        element: (
          <DecoratorRoute>
            <AssignedProjects />
          </DecoratorRoute>
        ),
      },
      {
        path: "decorator/schedule",
        element: (
          <DecoratorRoute>
            <TodaySchedule />
          </DecoratorRoute>
        ),
      },
      {
        path: "decorator/earnings",
        element: (
          <DecoratorRoute>
            <Earnings />
          </DecoratorRoute>
        ),
      },
    ],
  },
]);

export default router;
