import { Navigate } from "react-router-dom";
import { useIsAuthenticated } from "../../store/store";

const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
  
  const isAuthenticated = useIsAuthenticated((state) => state.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/signIn" />;
};

export default PrivateRoutes;
