import React from "react";
import { Navigate } from "react-router-dom"

import { isAuthenticated } from "../services/api/authToken"

export const PrivateRoute = ({ children }) => {

  return (
    isAuthenticated() ? children : <Navigate to="/login/signin" />
  );
}