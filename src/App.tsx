import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, styled, ThemeProvider } from "@mui/material";
import muiTheme from "./themes/muiTheme";

import HomePage from "./pages/home/Home.page";
import SignInPage from "./pages/signIn/SignIn.page";
import SignUpPage from "./pages/signUp/SignUp.page";
import MyGamesPage from "./pages/games/MyGames.page";
import ProfilePage from "./pages/profile/Profile.page";
import GamePage from "./pages/games/Game.page";
import PrivateRoutes from "./pages/privateRoutes/PrivateRoutes.page";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import AuthCheck from "./components/authCheck/AuthCheck";
import { GoogleOAuthProvider } from "@react-oauth/google";

const router = [
  { path: "/signIn", component: SignInPage, isPrivate: false },
  { path: "/signUp", component: SignUpPage, isPrivate: false },
  { path: "/", component: HomePage, isPrivate: true },
  {
    path: "/profile/:userId",
    component: ProfilePage,
    isPrivate: true,
  },
  { path: "/myGames/:userId", component: MyGamesPage, isPrivate: true },
  {
    path: "/game/:gameId",
    component: GamePage,
    isPrivate: true,
  },
  {
    path: "*",
    component: HomePage,
    isPrivate: true,
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
    <ThemeProvider theme={muiTheme}>
      <Router>
        <GoogleOAuthProvider clientId="334014688158-u013u8apl7tlv9vmipl42jj9pnmi416t.apps.googleusercontent.com">
          <AuthCheck>
            <BoxContainer
              sx={{ backgroundColor: muiTheme.palette.primary.main }}
            >
              <Navbar />
              <BoxContent>
                <Routes>
                  {router.map(({ path, component: Component, isPrivate }) => (
                    <Route
                      key={path}
                      path={path}
                      element={
                        isPrivate ? (
                          <PrivateRoutes>
                            <Component />
                          </PrivateRoutes>
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
          </AuthCheck>
        </GoogleOAuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
