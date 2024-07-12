import {Navigate} from "react-router-dom"

const PrivateRoutes = ({children}: {children: React.ReactNode}) => {
  //TODO - Connect with backend and check token.
  const isAuthenticated = true;
  return isAuthenticated ? children : <Navigate to="/signIn"/>
}

export default PrivateRoutes
