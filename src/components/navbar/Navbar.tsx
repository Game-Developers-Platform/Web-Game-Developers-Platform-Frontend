import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import muiTheme from "../../themes/muiTheme";
import AddGameModal from "./AddGameModal";

interface NavbarTitleProps {
  display: { xs: string; md: string };
  variant: "h6" | "h5" | "h4" | "h3" | "h2" | "h1";
}

const NavbarTitle = ({ display, variant }: NavbarTitleProps) => (
  <>
    <AdbIcon sx={{ display: display, mr: 1 }} />
    <Typography
      variant={variant}
      noWrap
      component="a"
      href="/"
      sx={{
        mr: 2,
        display: display,
        flexGrow: 1,
        fontWeight: 700,
        letterSpacing: ".1rem",
        color: "inherit",
        textDecoration: "none",
        fontSize: { xs: "1.1rem", sm: "1.5rem", md: "1.75rem", lg: "2rem" },
      }}
    >
      Game-Developers-Platform
    </Typography>
  </>
);

const Navbar = () => {
  const userId = localStorage.getItem("userId");

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [isAddGameModalOpen, setIsAddGameModalOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (path: string) => {
    setAnchorElUser(null);
    navigate(path);
  };

  const handleOpenAddGameModal = () => {
    setIsAddGameModalOpen(true);
  };

  const handleCloseAddGameModal = () => {
    setIsAddGameModalOpen(false);
  };

  const pages = [
    {
      title: "My Games",
      path: "/myGames",
      onClick: () => {
        navigate("/myGames");
        handleCloseNavMenu();
      },
    },
    {
      title: "Add Game",
      path: "/addGame",
      onClick: () => {
        console.log("test");
        handleOpenAddGameModal();
        handleCloseNavMenu();
      },
    },
  ];
  const settings = [
    { title: "Profile", path: `/profile/${userId}` },
    { title: "Logout", path: "/signIn" },
  ];

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: muiTheme.palette.secondary.main,
          color: muiTheme.palette.text.secondary,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <NavbarTitle display={{ xs: "none", md: "flex" }} variant="h6" />

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={() => setAnchorElNav(null)}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map(({ title, onClick }) => (
                  <MenuItem key={title} onClick={() => onClick()}>
                    <Typography textAlign="center">{title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <NavbarTitle display={{ xs: "flex", md: "none" }} variant="h5" />

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {React.Children.toArray(
                pages.map(({ title, onClick }) => (
                  <Button
                    onClick={() => onClick()}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {title}
                  </Button>
                ))
              )}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >
                {settings.map(({ title, path }) => (
                  <MenuItem
                    key={title}
                    onClick={() => {
                      handleCloseUserMenu(path);
                    }}
                  >
                    <Typography textAlign="center">{title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {isAddGameModalOpen && (
        <AddGameModal
          open={isAddGameModalOpen}
          onClose={handleCloseAddGameModal}
          onSubmit={() => {}}
        />
      )}
    </>
  );
};

export default Navbar;
