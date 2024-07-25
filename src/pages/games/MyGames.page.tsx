import { useState, ChangeEvent, useEffect } from "react";
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
import { useParams } from "react-router-dom";
import { gameLink } from "../../utils/constants/serverLink";
import axios from "axios";
import { IGame } from "../../utils/types/types";

const FlexedBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: theme.spacing(3),
}));

const MyGamesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { userId } = useParams();
  const [games, setGames] = useState<IGame[]>([]);
  const connectedUser = localStorage.getItem("userId");

  const isOwnProfile = userId === connectedUser;

  useEffect(() => {
    const fetchGames = async () => {
      const response = await axios.get(`${gameLink}developer/${userId}`);
      setGames(response.data);
    };
    fetchGames();
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const filteredGames = games.filter((game) => {
    return game.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

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
              key={gameData._id}
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
