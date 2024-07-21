import axios from "axios";
import { useEffect } from "react";
import { authLink } from "../utils/constants/serverLink";
import { useIsAuthenticated } from "../store/store";
import { useNavigate } from "react-router-dom";

const useAuthenticated = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const setAuthenticated = useIsAuthenticated(
    (state) => state.setIsAuthenticated
  );

  useEffect(() => {
    const checkToken = async () => {
      const response = await axios.post(`${authLink}/check-token`, {
        token,
      });
      if (!response.data?.isValidToken) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        setAuthenticated(false);
      } else {
        setAuthenticated(true);
        navigate("/");
      }
    };
    if (token) checkToken();
    else {
      setAuthenticated(false);
    }
  }, []);
};

export default useAuthenticated;
