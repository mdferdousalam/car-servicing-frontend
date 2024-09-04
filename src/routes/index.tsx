import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AdminLayout from "../components/layouts/AdminLayout";
import MainLayout from "../components/layouts/MainLayout";
import UserDashboardLayout from "../components/layouts/UserLayout";
import ErrorPage from "../pages/Error";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import ServiceDetailsPage from "../pages/ServiceDetails";
import ServicesPage from "../pages/Services";
import SignUpPage from "../pages/SignUp";
import AdminDashboardPage from "../pages/admin/AdminDashboard";
import UserDashboardPage from "../pages/users/UserDashboard";
import AboutPage from "../pages/About";
import BookingPage from "../pages/Booking";
import ServiceManagement from "../pages/admin/ServiceManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/services",
        element: <ServicesPage />,
      },
      {
        path: "/serviceDetails/:id",
        element: <ServiceDetailsPage />,
      },
      {
        path: "/booking",
        element: <BookingPage />,
      },
    ],
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
    path: "/admin",
    element: <AdminLayout></AdminLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/admin",
        element: <AdminDashboardPage></AdminDashboardPage>,
      },
      {
        path: "/admin/service-management",
        element: <ServiceManagement></ServiceManagement>,
      },
    ],
  },
  {
    path: "/user",
    element: <UserDashboardLayout></UserDashboardLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/user",
        element: <UserDashboardPage></UserDashboardPage>,
      },
    ],
  },
]);
