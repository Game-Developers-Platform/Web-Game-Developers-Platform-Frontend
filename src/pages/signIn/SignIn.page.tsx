import { useState } from "react";
import { NavLink } from "react-router-dom";
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    setFormData({
      email: "",
      password: "",
    });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: theme.palette.background.default,
                mt: 3,
                mb: 2,
              }}
            >
              Sign In
            </Button>
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
