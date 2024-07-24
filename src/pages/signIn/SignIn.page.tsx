import { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  useTheme,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import muiTheme from "../../themes/muiTheme";
import { usePost } from "../../hooks/usePost";
import {
  authLink,
  googleLink,
  userLink,
} from "../../utils/constants/serverLink";
import { useIsAuthenticated } from "../../store/store";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export type SignInType = {
  email: string;
  password: string;
};

const customTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": {
            color: muiTheme.palette.text.secondary,
            "&.Mui-focused": {
              color: muiTheme.palette.text.secondary,
            },
          },
          "& .MuiOutlinedInput-root": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: muiTheme.palette.background.default,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: muiTheme.palette.text.secondary,
              borderWidth: 2,
            },
            "& .MuiInputBase-input": {
              color: muiTheme.palette.text.secondary,
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: muiTheme.palette.text.hover,
          },
        },
      },
    },
  },
});

export default function SignIn() {
  const theme = useTheme();
  const [formData, setFormData] = useState<SignInType>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  const setIsAuthenticated = useIsAuthenticated(
    (state) => state.setIsAuthenticated
  );

  const authSuccess = (token: string, refreshToken: string, userId: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userId", userId);
    setIsAuthenticated(true);
    navigate("/");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormData({
      email: "",
      password: "",
    });

    await usePost(`${authLink}/login`, {
      email: formData.email,
      password: formData.password,
    })
      .then((response) => response.data)
      .then(({ token, refreshToken, userId }) => {
        authSuccess(token, refreshToken, userId);
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const googleAuthentication = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      const { data } = await axios.post(`${googleLink}`, {
        credential: credentialResponse.credential,
      });
      if (data?.email) {
        const { email, name } = data;
        const user = await axios.post(`${userLink}email`, {
          email: data.email,
        });
        if (user.data === null) {
          await axios.post(`${googleLink}register`, {
            name: name,
            email: email,
            password: "google-signup",
          });
        }
        await axios
          .post(`${authLink}login`, {
            email: email,
            password: "google-signup",
          })
          .then((response) => response.data)
          .then(({ token, refreshToken, userId }) => {
            authSuccess(token, refreshToken, userId);
          });
      }
    } catch (error) {
      console.error("Google Verify Error:", error);
    }
  };

  const googleErrorMessage = () => {
    console.log("Google Error");
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ color: muiTheme.palette.text.secondary }}
            component="h1"
            variant="h5"
          >
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={onChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={onChange}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 1,
                mb: 1,
                gap: 2,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.background.default,
                  flex: 1,
                }}
              >
                Sign In
              </Button>
              <Box sx={{ flex: 1 }}>
                <GoogleLogin
                  onSuccess={googleAuthentication}
                  onError={googleErrorMessage}
                />
              </Box>
            </Box>
            <Grid container>
              <Grid item xs>
                <NavLink style={{ color: muiTheme.palette.text.hover }} to="/">
                  Forgot password?
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink
                  style={{ color: muiTheme.palette.text.hover }}
                  to="/signup"
                >
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
