import { Navigate } from "react-router-dom";
import { useIsAuthenticated } from "../../store/store";
import useAuthenticated from "../../hooks/useAuthenticated";

const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
  useAuthenticated();
  const isAuthenticated = useIsAuthenticated((state) => state.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/signIn" />;
};

export default PrivateRoutes;
