import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  let isAuthenticated = false;
  const token = localStorage.getItem("token");

  if (token) isAuthenticated = true;

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/" />;
};

export default PrivateRoute;
