import React, { useEffect, useState } from "react";
import { CircularProgress, useTheme } from "@mui/material";
import { useIsAuthenticated } from "../../store/store";

const AuthCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();

  const setAuthenticated = useIsAuthenticated(
    (state) => state.setIsAuthenticated
  );

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setAuthenticated(!!token);
      setIsLoading(false);
    };

    checkAuth();
  }, [setAuthenticated]);

  if (isLoading) {
    return (
      <CircularProgress sx={{ color: theme.palette.background.default }} />
    );
  }

  return <>{children}</>;
};

export default AuthCheck;
