import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import FundraiserPage from "./pages/FundraiserPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import UserPage from "./pages/UserPage.jsx";

import Layout from "./components/Layout.jsx";

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> }, // 👈 home route

      { path: "fundraiser/:id", element: <FundraiserPage /> }, // 👈 no leading /

      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },

      { path: "*", element: <p>Page not found</p> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={myRouter} />
  </React.StrictMode>,
);
