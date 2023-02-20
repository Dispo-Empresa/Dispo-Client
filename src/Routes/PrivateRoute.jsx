import React from "react";
import { Navigate } from "react-router-dom"
import { getToken } from "../services/Getters/lsTokenService"

export const PrivateRoute = ({ children }) => {

  const isAuthenticated = getToken() != null;
  return (
    isAuthenticated ? children : <Navigate to="/login/signin" />
  );
}