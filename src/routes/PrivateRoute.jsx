import { Navigate } from "react-router-dom";

import { isAuthenticated } from "../services/api/authToken";

const PrivateRoute = ({ children }) => {
  const authenticated = isAuthenticated();

  if (!authenticated) {
    return <Navigate to="/404" />;
  }

  return <div>{children}</div>;
};

export default PrivateRoute;
