import React from "react";

import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import HomePage from "./pages/HomePage.jsx";
import getUser from "./api/get-user.js";
import FundraiserPage from "./pages/FundraiserPage.jsx";
import NewFundraiserPage from "./pages/NewFundraiserPage.jsx";
import BuildingPage from "./pages/BuildingPage.jsx";
import StrataCommunitiesPage from "./pages/StrataCommunitiesPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import EditBuildingPage from "./pages/EditBuildingPage.jsx";
import EditFundraiserPage from "./pages/EditFundraiserPage.jsx";

import Layout from "./components/Layout.jsx";

import { AuthProvider } from "./components/AuthProvider.jsx";

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "auth", element: <AuthProvider /> },

      { path: "fundraisers/new", element: <NewFundraiserPage /> },
      { path: "fundraisers/:id", element: <FundraiserPage /> },
      { path: "fundraisers/:id/edit", element: <EditFundraiserPage /> },

      { path: "buildings/:id", element: <BuildingPage /> },
      { path: "buildings/:id/edit", element: <EditBuildingPage /> },
      { path: "strata-communities", element: <StrataCommunitiesPage /> },

      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },

      { path: "*", element: <p>Page not found</p> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={myRouter} />
    </AuthProvider>
  </React.StrictMode>,
);
