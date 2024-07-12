import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import {Box, styled } from "@mui/material"

import HomePage from "./pages/home/Home.page"
import SignInPage from "./pages/signIn/SignIn.page"
import SignUpPage from "./pages/signUp/SignUp.page"
import MyGamesPage from "./pages/games/MyGames.page"
import ProfilePage from "./pages/profile/Profile.page"
import PrivateRoutes from "./pages/privateRoutes/PrivateRoutes.page"
import Navbar from "./component/navbar/Navbar"
import Footer from "./component/footer/Footer"


const router = [{
  path: "/signIn",
  component: SignInPage ,
  isPrivate: false
},
{
  path: "/signUp",
  component:  SignUpPage,
  isPrivate: false
},
{
  path: "/",
  component: HomePage ,
  isPrivate: true
},
{
  path: "/profile",
  component: ProfilePage ,
  isPrivate: true
},
{
  path: "/myGames",
  component: MyGamesPage ,
  isPrivate: true
},
]



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
    <Router>
      <BoxContainer>
        <Navbar/>
        <BoxContent>
          <Routes>
            { 
              router.map(({path, component: Component, isPrivate}) => (
                <Route key={path} path={path} element={isPrivate ? <PrivateRoutes><Component/></PrivateRoutes> : <Component/>} />
              ))
            }
          </Routes>
        </BoxContent>
        <Footer/>
      </BoxContainer>
    </Router>
  )
}

export default App
