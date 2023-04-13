import React from "react";
import { Navigate } from "react-router-dom"
import { isAuthenticated } from "../../services/Getters/lsTokenService"

export const PrivateRoute = ({ children }) => {

  return (
    isAuthenticated() ? children : <Navigate to="/login/signin" />
  );
}