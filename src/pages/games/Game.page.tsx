import { Box, Grid, Typography, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import muiTheme from "../../themes/muiTheme";
import steamLogo from "../../assets/icons/logo-steam.svg";
import originLogo from "../../assets/icons/logo-origin.svg";
import epicGamesLogo from "../../assets/icons/logo-epic-games.svg";
import xboxLogo from "../../assets/icons/logo-xbox.svg";
import { IGame, IUser } from "../../utils/types/types.ts";

const GamePage = ({ game, user }: { game: IGame; user: IUser }) => {
  const navigate = useNavigate();

  const isMyGame = game.developerId === user.id;

  const handleProfileClick = () => {
    navigate(`/profile/${game.developerId}`);
  };

  //TODO - Change to map between name and logo.

  const platformLogoMap = new Map<string, string>([
    ["Steam", steamLogo],
    ["Origin", originLogo],
  ]);

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          sx={{
            color: muiTheme.palette.text.details,
            fontSize: "2rem",
            marginBottom: 2,
          }}
        >
          {game.name}
        </Typography>
        <Box
          component="img"
          sx={{
            width: "100%",
            maxWidth: { xs: 300, sm: 400, md: 500, lg: 600 },
            height: "auto",
            borderRadius: 1,
            boxShadow: 3,
            transition: "max-width 0.3s ease-in-out",
            marginBottom: 2,
          }}
          alt={game.name}
          src={game.image}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 2,
            width: "50%",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: muiTheme.palette.text.secondary,
              marginBottom: 0.5,
            }}
          >
            Description
          </Typography>
          <Typography
            sx={{
              color: muiTheme.palette.text.details,
              textAlign: "center",
            }}
          >
            {game.description}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 2,
            width: "50%",
          }}
        >
          <Box sx={{ marginRight: 4 }}>
            <Typography
              variant="h6"
              sx={{
                color: muiTheme.palette.text.secondary,
                marginBottom: 0.5,
              }}
            >
              Release Date
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: muiTheme.palette.text.details,
                marginBottom: 1.5,
              }}
            >
              {new Date(game.releaseDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                color: muiTheme.palette.text.secondary,
                marginBottom: 0.5,
              }}
            >
              Price
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: muiTheme.palette.text.details,
                marginBottom: 1.5,
              }}
            >
              ${game.price}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: muiTheme.palette.text.secondary,
              marginBottom: 0.5,
            }}
          >
            Released On
          </Typography>
          <Box sx={{ display: "flex", gap: 1, marginTop: 1 }}>
            {game.platformLinks.map((platformLink) => (
              <IconButton
                key={platformLink.platform}
                onClick={() => window.open(platformLink.url, "_blank")}
              >
                <img
                  src={platformLogoMap.get(platformLink.platform)}
                  alt={platformLink.platform}
                  style={{ width: 32, height: 32 }}
                />
              </IconButton>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 2,
            width: "50%",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: muiTheme.palette.text.secondary,
              marginBottom: 0.5,
            }}
          >
            Developer
          </Typography>
          <Typography
            sx={{
              color: muiTheme.palette.text.details,
              textAlign: "center",
              marginBottom: 1.5,
            }}
          >
            {user.name}
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: muiTheme.palette.secondary.main,
              color: muiTheme.palette.text.secondary,
              "&:hover": {
                backgroundColor: muiTheme.palette.primary.dark,
              },
            }}
            onClick={handleProfileClick}
          >
            {isMyGame ? "My Profile" : "Developer Profile"}
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default GamePage;
