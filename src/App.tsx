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
import { IGame } from "./utils/types/types.ts";

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
  name: "Terraria",
  price: 9.99,
  image:
    "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/105600/header.jpg?t=1666290860",
  description:
    "Dig, fight, explore, build! Nothing is impossible in this action-packed adventure game. Four Pack also available!",
  developerId: "3",
  platformLinks: [
    {
      platform: "Steam",
      url: "https://store.steampowered.com/app/105600/Terraria/",
    },
  ],
  releaseDate: new Date("2011-05-16"),
  views: 58,
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
