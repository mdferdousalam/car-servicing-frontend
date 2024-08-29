import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/Home";
import ServicesPage from "../pages/Services";
import SignUpPage from "../pages/SignUp";
import LoginPage from "../pages/Login";
import ServiceDetailsPage from "../pages/ServiceDetails";
import AdminLayout from "../components/layouts/AdminLayout";
import ErrorPage from "../pages/Error";
import AdminDashboardPage from "../pages/admin/AdminDashboard";
import UserDashboardLayout from "../components/layouts/UserLayout";
import UserDashboardPage from "../pages/users/UserDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/services",
        element: <ServicesPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/services",
        element: <ServicesPage />,
      },
      {
        path: "/services/details",
        element: <ServiceDetailsPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout></AdminLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/dashboard",
        element: <AdminDashboardPage></AdminDashboardPage>,
      },
    ],
  },
  {
    path: "/user",
    element: <UserDashboardLayout></UserDashboardLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/dashboard",
        element: <UserDashboardPage></UserDashboardPage>,
      },
    ],
  },
]);
