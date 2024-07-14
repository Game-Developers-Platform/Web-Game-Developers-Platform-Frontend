import { useState, ChangeEvent } from 'react';
import { Box, Grid, styled, TextField, Select, MenuItem, Chip, InputAdornment, IconButton, SelectChangeEvent } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import GameCard from "../../component/GameCard";

const defaultGameCardData = [
  {
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1151640/header.jpg?t=1717621265",
    title: "Horizon Zero Dawn",
    description: "Experience Aloy’s legendary quest to unravel the mysteries of a future Earth ruled by Machines. Use devastating tactical attacks against your prey and explore a majestic open world in this award-winning action RPG!",
    categories: ["action", "adventure"],
    id: 1,
  },
  {
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2567870/header.jpg?t=1719621610",
    title: "Chained Together",
    description:
      "From the depths of hell, climb chained to your friends through diverse worlds. Solo or co-op, try to reach the summit and discover what awaits you there...",
    categories: ["adventure"],
    id: 2,
  },
  {
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/105600/header.jpg?t=1666290860",
    title: "Terraria",
    description:
      "Dig, fight, explore, build! Nothing is impossible in this action-packed adventure game. Four Pack also available!",
    categories: ["action", "adventure"],
    id: 3,
  },
  {
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/header.jpg?t=1719426374",
    title: "Counter Strike 2",
    description:
      "For over two decades, Counter-Strike has offered an elite competitive experience, one shaped by millions of players from across the globe. And now the next chapter in the CS story is about to begin. This is Counter-Strike 2.",
    categories: ["action"],
    id: 4,
  },
];

const categories = ["action", "adventure", "RPG", "strategy", "test", "test1"];

const FlexedBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: theme.spacing(3),
}));

const SearchBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: theme.spacing(3),
  gap: theme.spacing(2),
}));

const FiltersBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filters, setFilters] = useState<string[]>([]);

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
    setFilters((filters) => filters.filter((filter) => filter !== filterToDelete));
  };

  const filteredGames = defaultGameCardData.filter((game) => {
    return (
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.length === 0 || filters.every((filter) => game.categories.includes(filter)))
    );
  });

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <SearchBox>
        <TextField
          variant="outlined"
          label="Search Games"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClearSearch}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ width: "50%" }}
        />
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          displayEmpty
          sx={{ width: "20%" }}
        >
          <MenuItem value="" disabled>Select Category</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </SearchBox>
      <FiltersBox>
        {filters.map((filter) => (
          <Chip key={filter} label={filter} onDelete={handleDeleteFilter(filter)} />
        ))}
      </FiltersBox>
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

export default HomePage;