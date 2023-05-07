import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const authenticated = localStorage.getItem("accessToken");

  if (!authenticated) {
    return <Navigate to="/" />;
  }

  return <div>{children}</div>;
};

export default PrivateRoute;
