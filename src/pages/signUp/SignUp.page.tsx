import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  useTheme,
  createTheme,
  ThemeProvider,
  IconButton,
  Tooltip,
} from "@mui/material/";
import muiTheme from "../../themes/muiTheme";
import { HelpOutline as HelpOutlineIcon } from "@mui/icons-material";

export type SignUpType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthdate: string;
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
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: muiTheme.palette.text.secondary,
            },
            "& .MuiInputBase-input": {
              color: muiTheme.palette.text.secondary,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: muiTheme.palette.background.default,
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
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "0.75rem",
          backgroundColor: muiTheme.palette.background.paper,
          color: muiTheme.palette.text.primary,
          borderRadius: "4px",
          padding: "8px",
          maxWidth: "200px", // Adjust width if necessary
        },
      },
    },
  },
});

const SignUpPage = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState<SignUpType>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthdate: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthdate: "",
  });

  const validateName = (name: string) => {
    const nameRegex = /^(?!^\s|\s$)[A-Za-z0-9\s]{2,30}$/;
    return nameRegex.test(name)
      ? ""
      : "Name must be between 2 and 30 characters long and contain only letters, numbers, and spaces.";
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]{3,55}@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
      ? ""
      : "Email must be between 3 and 55 characters long and in a valid format.";
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;
    return passwordRegex.test(password)
      ? ""
      : "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one special character.";
  };

  const validateConfirmPassword = (
    confirmPassword: string,
    password: string
  ) => {
    return confirmPassword === password ? "" : "Passwords do not match.";
  };

  const validateBirthdate = (birthdate: string) => {
    const today = new Date();
    const birthDate = new Date(birthdate);

    if (isNaN(birthDate.getTime())) {
      return "Invalid date.";
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age >= 16 ? "" : "You must be at least 16 years old.";
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(
        formData.confirmPassword,
        formData.password
      ),
      birthdate: validateBirthdate(formData.birthdate),
    };

    if (Object.values(newErrors).every((error) => error === "")) {
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthdate: "",
      });
    } else {
      setErrors(newErrors);
    }
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
            component="h1"
            variant="h5"
            sx={{ color: muiTheme.palette.text.secondary, mb: 2 }}
          >
            Sign Up
          </Typography>
          <IconButton
            sx={{
              m: 1,
              bgcolor: theme.palette.secondary.contrastText,
              p: 0,
            }}
            onClick={() => {
              // Handle Avatar click (if needed)
            }}
          >
            <Avatar
              src={`https://api.adorable.io/avatars/100/${Math.random()}.png`}
              sx={{ width: 56, height: 56 }}
            />
          </IconButton>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={onChange}
                  value={formData.name}
                  helperText={errors.name}
                  error={Boolean(errors.name)}
                  InputProps={{
                    endAdornment: (
                      <Tooltip
                        title={
                          <div>
                            <Typography variant="body2">
                              Name Requirements:
                            </Typography>
                            <ul style={{ paddingLeft: "20px" }}>
                              <li>2 - 30 characters long</li>
                              <li>Only letters, numbers, and spaces</li>
                              <li>No leading or trailing spaces</li>
                            </ul>
                          </div>
                        }
                      >
                        <IconButton>
                          <HelpOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  onChange={onChange}
                  value={formData.email}
                  helperText={errors.email}
                  error={Boolean(errors.email)}
                  InputProps={{
                    endAdornment: (
                      <Tooltip
                        title={
                          <div>
                            <Typography variant="body2">
                              Email Requirements:
                            </Typography>
                            <ul style={{ paddingLeft: "20px" }}>
                              <li>3 - 55 characters long</li>
                              <li>Must be a valid email format</li>
                            </ul>
                          </div>
                        }
                      >
                        <IconButton>
                          <HelpOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={onChange}
                  value={formData.password}
                  helperText={errors.password}
                  error={Boolean(errors.password)}
                  InputProps={{
                    endAdornment: (
                      <Tooltip
                        title={
                          <div>
                            <Typography variant="body2">
                              Password Requirements:
                            </Typography>
                            <ul style={{ paddingLeft: "20px" }}>
                              <li>Minimum length 6</li>
                              <li>Contains one capital letter</li>
                              <li>Contains one lower letter</li>
                              <li>Contains one special character</li>
                            </ul>
                          </div>
                        }
                      >
                        <IconButton>
                          <HelpOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  onChange={onChange}
                  value={formData.confirmPassword}
                  helperText={errors.confirmPassword}
                  error={Boolean(errors.confirmPassword)}
                  InputProps={{
                    endAdornment: (
                      <Tooltip
                        title={
                          <div>
                            <Typography variant="body2">
                              Confirmation Requirements:
                            </Typography>
                            <ul style={{ paddingLeft: "20px" }}>
                              <li>Must match the Password field</li>
                            </ul>
                          </div>
                        }
                      >
                        <IconButton>
                          <HelpOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="birthdate"
                  label="Birthdate"
                  name="birthdate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  onChange={onChange}
                  value={formData.birthdate}
                  helperText={errors.birthdate}
                  error={Boolean(errors.birthdate)}
                />
              </Grid>
            </Grid>
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-start">
              <Grid item>
                <NavLink
                  style={{ color: theme.palette.text.hover }}
                  to="/signin"
                >
                  Already have an account? Sign In
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUpPage;
