import { useState, ChangeEvent, useEffect } from "react";
import {
  Box,
  Grid,
  styled,
  TextField,
  Select,
  MenuItem,
  Chip,
  InputAdornment,
  IconButton,
  SelectChangeEvent,
} from "@mui/material";
import { Clear as ClearIcon } from "@mui/icons-material";
import GameCard from "../../components/GameCard";
import muiTheme from "../../themes/muiTheme";
import { IGame } from "../../utils/types/types";
import axios from "axios";
import { gameLink } from "../../utils/constants/serverLink";
import { supportedCategories } from "../../utils/constants/supportedOptions";

const FlexedBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: theme.spacing(3),
}));

const FiltersBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const TransitionGridItem = styled(Grid)(() => ({
  transition: "all 0.4s ease-in-out",
}));

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filters, setFilters] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [games, setGames] = useState<IGame[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const response = await axios.get(`${gameLink}`);
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

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const category = event.target.value as string;
    if (category && !filters.includes(category)) {
      setFilters([...filters, category]);
    }
    setSelectedCategory("");
  };

  const handleDeleteFilter = (filterToDelete: string) => () => {
    setFilters((filters) =>
      filters.filter((filter) => filter !== filterToDelete)
    );
  };

  const handleOpen = () => {
    setExpanded(true);
  };

  const handleClose = () => {
    setExpanded(false);
  };

  const filteredGames = games?.filter((game) => {
    return (
      game.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.length === 0 ||
        filters.every((filter) => game.categories.includes(filter)))
    );
  });

  const filteredCategories = supportedCategories.filter(
    (category) =>
      !filters.includes(
        category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
      )
  );

  return (
    games && (
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container rowSpacing={2}>
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
            xs={12}
            md={6}
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
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
            xs={12}
            md={6}
          >
            <Select
              aria-expanded={expanded}
              onOpen={handleOpen}
              onClose={handleClose}
              value={selectedCategory}
              onChange={handleCategoryChange}
              displayEmpty
              MenuProps={{
                PaperProps: {
                  style: {
                    height: "12rem",
                  },
                  sx: {
                    "& .MuiList-root": {
                      backgroundColor: muiTheme.palette.text.secondary,
                    },
                  },
                },
              }}
              sx={{
                borderRadius: "1rem",
                border: expanded
                  ? "2px solid " + muiTheme.palette.text.primary
                  : "1px solid " + muiTheme.palette.text.description,
                maxWidth: "15rem",
                color: muiTheme.palette.text.secondary,
                "& .MuiSelect-icon": {
                  color: muiTheme.palette.text.secondary,
                },
              }}
            >
              <MenuItem value="" disabled>
                Select Category
              </MenuItem>
              {filteredCategories.map((category) => {
                const categoryName =
                  category.charAt(0).toUpperCase() +
                  category.slice(1).toLowerCase();
                return (
                  <MenuItem key={categoryName} value={categoryName}>
                    {categoryName}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
        </Grid>
        <FiltersBox>
          {filters.map((filter) => (
            <Chip
              sx={{
                mb: 5,
                backgroundColor: muiTheme.palette.secondary.main,
                color: muiTheme.palette.text.secondary,
                "& .MuiChip-deleteIcon": {
                  color: muiTheme.palette.text.delete,
                  "&:hover": {
                    color: muiTheme.palette.text.deleteHover,
                  },
                },
              }}
              key={filter}
              label={filter}
              onDelete={handleDeleteFilter(filter)}
            />
          ))}
        </FiltersBox>
        <FlexedBox>
          <Grid
            container
            rowSpacing={6}
            columnSpacing={1}
            sx={{ maxWidth: "85rem", mb: 3 }}
          >
            {filteredGames.map((gameData) => (
              <TransitionGridItem
                xs={12}
                sm={6}
                md={4}
                lg={3}
                item
                key={gameData.name}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <GameCard {...gameData} />
              </TransitionGridItem>
            ))}
          </Grid>
        </FlexedBox>
      </Box>
    )
  );
};

export default HomePage;
