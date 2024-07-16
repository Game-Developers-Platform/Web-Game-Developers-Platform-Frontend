import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, styled, ThemeProvider } from "@mui/material";
import muiTheme from "./themes/muiTheme";

import HomePage from "./pages/home/Home.page";
import SignInPage from "./pages/signIn/SignIn.page";
import SignUpPage from "./pages/signUp/SignUp.page";
import MyGamesPage from "./pages/games/MyGames.page";
import AddGamePage from "./pages/games/AddGame.page";
import ProfilePage from "./pages/profile/Profile.page";
import GamePage from "./pages/games/Game.page";
import PrivateRoutes from "./pages/privateRoutes/PrivateRoutes.page";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  profileImage: string;
  socialNetworks: { platform: string; url: string }[];
  gamesId: string[];
  birthDate: Date;
  views: number;
  refreshTokens: string[];
}

const currentUser: IUser = {
  id: "1",
  name: "Lior Hassin",
  email: "liorhassin3@gmail.com",
  password: "",
  profileImage: "https://avatar.iran.liara.run/public/22",
  birthDate: new Date("1994-01-01"),
  gamesId: ["1", "2"],
  views: 0,
  refreshTokens: [],
  socialNetworks: [],
};

const router = [
  { path: "/signIn", component: SignInPage, isPrivate: false },
  { path: "/signUp", component: SignUpPage, isPrivate: false },
  { path: "/", component: HomePage, isPrivate: true },
  { path: "/profile", component: ProfilePage, isPrivate: true },
  { path: "/myGames", component: MyGamesPage, isPrivate: true },
  { path: "/addGame", component: AddGamePage, isPrivate: true },
  { path: "/game", component: GamePage, isPrivate: true },
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
  const isAuthenticated = true; // TODO - Implement authentication logic

  return (
    <ThemeProvider theme={muiTheme}>
      <Router>
        <BoxContainer sx={{ backgroundColor: muiTheme.palette.primary.main }}>
          {isAuthenticated && <Navbar />}
          <BoxContent>
            <Routes>
              {router.map(({ path, component: Component, isPrivate }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    isPrivate ? (
                      <PrivateRoutes>
                        {path === "/profile" ? (
                          <Component user={currentUser} />
                        ) : (
                          <Component user={currentUser} />
                        )}
                      </PrivateRoutes>
                    ) : (
                      <Component user={currentUser} />
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
