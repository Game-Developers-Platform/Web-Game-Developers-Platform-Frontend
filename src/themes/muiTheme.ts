import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeText {
    link: string;
    white: string;
    title: string;
    description: string;
    button: string;
    hover: string;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#31363F", // Main content color
    },
    secondary: {
      main: "#222831", // Navbar/Footer color
    },
    background: {
      default: "#76ABAE", // Cards Color
    },
    text: {
      primary: "#1B1B1B",
      secondary: "#EEEEEE", //Used for dropdown menu's.
      title: "#222831",
      description: "#31363F",
      button: "#1B1B1B",
      link: "#76ABAE",
      hover: "#416263",
    },
  },
});

export default theme;
