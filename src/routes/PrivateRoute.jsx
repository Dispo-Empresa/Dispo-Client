import { Navigate } from "react-router-dom";

import { isAuthenticated } from "../services/authToken";
import { setLocalStorage } from "../data/local";
import { browserStorageKeys } from "../utils/constants/constants";
import { getRole } from "../services/authToken";

const PrivateRoute = ({ children, roles }) => {
  const authenticated = isAuthenticated();

  if (!authenticated) {
    setLocalStorage(
      browserStorageKeys.LastAccessedUrl,
      window.location.pathname
    );
    return <Navigate to="/login/signin" />;
  }

  if (roles && !roles.includes(getRole())) {
    return <Navigate to="/404" />;
  }

  return <div>{children}</div>;
};

export default PrivateRoute;
