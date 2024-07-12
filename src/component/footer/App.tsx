import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import SignupPage from "./pages/Signup/SignupPage";
import SigninPage from "./pages/Signin/SigninPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import { Box, ThemeProvider, styled } from "@mui/material";
import Navbar from "./component/navbar/Navbar";
import theme from "./theme";
import Footer from "./component/footer/Footer";
import ProfilePage from "./pages/Profile/ProfilePage";
import PrivateRoute from "./pages/PrivateRoutes/PrivateRoutes";

// TODO -> Make all the routes except the SignIn/SignUp page private.
const router = [
  {
    path: "/",
    component: HomePage,
    isPrivate: true,
  },
  {
    path: "/profile", //TODO -> add /profile/:id and get the id from the url.
    component: ProfilePage,
    isPrivate: true,
  },
  {
    path: "/signup",
    component: SignupPage,
    isPrivate: false,
  },
  {
    path: "/signin",
    component: SigninPage,
    isPrivate: false,
  },
  {
    path: "*",
    component: NotFoundPage,
    isPrivate: false,
  },
];

const BoxContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const BoxContent = styled(Box)({
  flexGrow: 1,
  overflowX: "hidden",
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <BoxContainer>
          <Navbar />
          <BoxContent>
            <Routes>
              {router.map(({ path, component: Component, isPrivate }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    isPrivate ? (
                      <PrivateRoute>
                        <Component />
                      </PrivateRoute>
                    ) : (
                      <Component />
                    )
                  }
                />
              ))}
            </Routes>
          </BoxContent>
          <Footer />
        </BoxContainer>
      </Router>
    </ThemeProvider>
  );
};

export default App;
