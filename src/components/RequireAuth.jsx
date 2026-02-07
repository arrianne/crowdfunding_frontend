// src/components/RequireAuth.jsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // adjust path

export default function RequireAuth({ children }) {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  if (!auth?.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
