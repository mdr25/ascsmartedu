import { Navigate } from "react-router-dom";

const ProtectedAuthRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/" /> : children;
};

export default ProtectedAuthRoute;
