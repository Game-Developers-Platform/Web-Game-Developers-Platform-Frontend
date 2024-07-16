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

export interface IGame {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  developerId: string;
  platformLinks: { platform: string; url: string }[];
  releaseDate: Date;
  views: number;
  categories: string[];
}

const currentUser = {
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

const exampleGame: IGame = {
  id: "1",
  name: "Horizon Zero Dawn",
  price: 59.99,
  image: "https://example.com/game-image.jpg",
  description:
    "Experience Aloy’s legendary quest to unravel the mysteries of a future Earth ruled by Machines.",
  developerId: "developer123",
  platformLinks: [
    {
      platform: "Steam",
      url: "https://store.steampowered.com/horizon-zero-dawn",
    },
    {
      platform: "Epic Games",
      url: "https://www.epicgames.com/horizon-zero-dawn",
    },
    { platform: "Origin", url: "https://www.origin.com/horizon-zero-dawn" },
  ],
  releaseDate: new Date("2023-05-01"),
  views: 1000,
  categories: ["Action", "Adventure"],
};

const router = [
  { path: "/signIn", component: SignInPage, isPrivate: false },
  { path: "/signUp", component: SignUpPage, isPrivate: false },
  { path: "/", component: HomePage, isPrivate: true },
  {
    path: "/profile",
    component: () => <ProfilePage user={currentUser} />,
    isPrivate: true,
  },
  { path: "/myGames", component: MyGamesPage, isPrivate: true },
  {
    path: "/game",
    component: () => <GamePage game={exampleGame} user={currentUser} />,
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
      </Router>
    </ThemeProvider>
  );
};

export default App;
