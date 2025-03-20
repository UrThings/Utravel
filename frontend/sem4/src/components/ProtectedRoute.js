import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (user === undefined) return <p>Loading...</p>;
  return user?.position === role ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
