import { useState, ChangeEvent } from "react";
import {
  Box,
  Grid,
  styled,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { Clear as ClearIcon } from "@mui/icons-material";
import GameCard from "../../components/GameCard";
import muiTheme from "../../themes/muiTheme";

const defaultGameCardData = [
  {
    image:
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1151640/header.jpg?t=1717621265",
    name: "Horizon Zero Dawn",
    description:
      "Experience Aloy’s legendary quest to unravel the mysteries of a future Earth ruled by Machines. Use devastating tactical attacks against your prey and explore a majestic open world in this award-winning action RPG!",
    categories: ["Action", "Adventure"],
    id: "1",
    developerId: "test",
  },
  {
    image:
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2567870/header.jpg?t=1719621610",
    name: "Chained Together",
    description:
      "From the depths of hell, climb chained to your friends through diverse worlds. Solo or co-op, try to reach the summit and discover what awaits you there...",
    categories: ["Adventure"],
    id: "2",
    developerId: "test",
  },
  {
    image:
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/105600/header.jpg?t=1666290860",
    name: "Terraria",
    description:
      "Dig, fight, explore, build! Nothing is impossible in this action-packed adventure game. Four Pack also available!",
    categories: ["Action", "Adventure"],
    id: "3",
    developerId: "test",
  },
  {
    image:
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/header.jpg?t=1719426374",
    name: "Counter Strike 2",
    description:
      "For over two decades, Counter-Strike has offered an elite competitive experience, one shaped by millions of players from across the globe. And now the next chapter in the CS story is about to begin. This is Counter-Strike 2.",
    categories: ["Action"],
    id: "4",
    developerId: "test",
  },
];

const FlexedBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: theme.spacing(3),
}));

const MyGamesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const filteredGames = defaultGameCardData.filter((game) => {
    return game.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const isOwnProfile = true;

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography
        sx={{
          color: muiTheme.palette.text.secondary,
          textAlign: "center",
          marginBottom: 2,
          fontSize: "2rem",
        }}
      >
        {isOwnProfile ? "My Games" : "Developer Name Games"}
      </Typography>
      <Grid container rowSpacing={2}>
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "1rem",
            width: "100%",
          }}
          xs={12}
        >
          <TextField
            sx={{
              maxWidth: "15rem",
              color: muiTheme.palette.text.secondary,
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused > fieldset": {
                  borderColor: muiTheme.palette.text.primary,
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: muiTheme.palette.text.secondary,
              },
              "& .MuiInputBase-root": {
                borderRadius: "1rem",
              },
            }}
            variant="outlined"
            label="Search Games"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              style: { color: muiTheme.palette.text.secondary },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClearSearch}>
                    <ClearIcon
                      sx={{ color: muiTheme.palette.text.secondary }}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <FlexedBox>
        <Grid
          container
          rowSpacing={6}
          columnSpacing={1}
          sx={{ maxWidth: "85rem" }}
        >
          {filteredGames.map((gameData) => (
            <Grid
              xs={12}
              sm={6}
              md={4}
              lg={4}
              item
              key={gameData.id}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <GameCard {...gameData} />
            </Grid>
          ))}
        </Grid>
      </FlexedBox>
    </Box>
  );
};

export default MyGamesPage;
