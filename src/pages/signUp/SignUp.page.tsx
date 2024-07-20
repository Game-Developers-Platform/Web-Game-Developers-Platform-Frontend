import React, { useState } from "react";
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
  MenuItem,
} from "@mui/material/";
import muiTheme from "../../themes/muiTheme";
import { HelpOutline as HelpOutlineIcon } from "@mui/icons-material";
import { styled } from "@mui/system";
import {
  validateBirthdate,
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
  validateUrl,
} from "../../utils/validations/validations";
import { supportedSocialNetworks } from "../../utils/constants/supportedOptions";
import { getPlatformRegex } from "../../utils/constants/regex";

export type SignUpType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthdate: string;
  socialNetworks: { platform: string; url: string }[];
};

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    color: muiTheme.palette.text.secondary,
  },
  "& .MuiInputLabel-root": {
    color: muiTheme.palette.text.secondary,
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius,
    marginTop: 0,
  },
}));

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
          maxWidth: "200px",
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
    socialNetworks: [],
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthdate: "",
    socialNetworks: [] as { platform: string; urlError: string }[],
  });

  const [platformLinks, setPlatformLinks] = React.useState<
    { platform: string; url: string }[]
  >([]);
  const [selectedPlatform, setSelectedPlatform] = React.useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const filteredPlatforms = platformLinks.filter(
      (platform) => platform.url !== ""
    );

    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(
        formData.confirmPassword,
        formData.password
      ),
      birthdate: validateBirthdate(formData.birthdate),
      socialNetworks: filteredPlatforms.map(({ platform, url }) => ({
        platform,
        urlError: validateUrl(url, getPlatformRegex(platform), platform),
      })),
    };

    const hasErrors =
      [
        newErrors.name,
        newErrors.email,
        newErrors.password,
        newErrors.confirmPassword,
        newErrors.birthdate,
      ].some((error) => error !== "") ||
      newErrors.socialNetworks.some(({ urlError }) => urlError !== "");

    if (!hasErrors) {
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthdate: "",
        socialNetworks: filteredPlatforms,
      });
    } else {
      setErrors(newErrors);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlatformChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const platformName = event.target.value as string;
    setSelectedPlatform(platformName);
    if (!platformLinks.find((platform) => platform.platform === platformName)) {
      setPlatformLinks((prevPlatforms) => [
        ...prevPlatforms,
        { platform: platformName, url: "" },
      ]);
      setErrors((prevErrors) => ({
        ...prevErrors,
        socialNetworks: [
          ...prevErrors.socialNetworks,
          { platform: platformName, urlError: "" },
        ],
      }));
    }
  };

  const handlePlatformUrlChange = (index: number, url: string) => {
    setPlatformLinks((prevPlatforms) => {
      const updatedPlatforms = [...prevPlatforms];
      updatedPlatforms[index].url = url;

      const newErrors = [...errors.socialNetworks];
      newErrors[index].urlError = validateUrl(
        url,
        getPlatformRegex(selectedPlatform),
        selectedPlatform
      );
      setErrors((prevErrors) => ({ ...prevErrors, socialNetworks: newErrors }));

      if (url === "") {
        updatedPlatforms.splice(index, 1);
        newErrors.splice(index, 1);
      }

      return updatedPlatforms;
    });
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: muiTheme.palette.text.secondary, mb: 1 }}
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
              //TODO - Handle Icon Selector
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
            sx={{ mt: 2 }}
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
            <CustomTextField
              select
              label="Social Network"
              value={selectedPlatform}
              onChange={handlePlatformChange}
              fullWidth
              margin="normal"
              variant="outlined"
              SelectProps={{
                displayEmpty: true,
                MenuProps: {
                  PaperProps: {
                    style: {
                      backgroundColor: muiTheme.palette.primary.main,
                      color: muiTheme.palette.text.secondary,
                      height: "7rem",
                    },
                  },
                },
              }}
              InputLabelProps={{
                style: { color: muiTheme.palette.text.secondary },
              }}
            >
              {supportedSocialNetworks.map((socialNetwork) => (
                <MenuItem key={socialNetwork} value={socialNetwork}>
                  {socialNetwork}
                </MenuItem>
              ))}
            </CustomTextField>
            {platformLinks.map(
              (platform, index) =>
                platform.platform === selectedPlatform && (
                  <CustomTextField
                    key={index}
                    label={`${platform.platform} URL`}
                    value={platform.url}
                    onChange={(e) =>
                      handlePlatformUrlChange(index, e.target.value)
                    }
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={Boolean(errors.socialNetworks[index]?.urlError)}
                    helperText={errors.socialNetworks[index]?.urlError}
                  />
                )
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: theme.palette.background.default,
                mt: 2,
                mb: 2,
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-start">
              <Grid item sx={{ marginBottom: 2 }}>
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
