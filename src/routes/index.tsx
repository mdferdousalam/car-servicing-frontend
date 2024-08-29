import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/Home";
import ServicesPage from "../pages/Services";
import SignUpPage from "../pages/SignUp";
import LoginPage from "../pages/Login";
import ServiceDetailsPage from "../pages/ServiceDetails";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
]);
