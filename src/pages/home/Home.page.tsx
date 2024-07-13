import { Box, Grid, styled } from "@mui/material";
import GameCard from "../../component/GameCard";

const defaultGameCardData = [
  {
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1151640/header.jpg?t=1717621265",
    title: "Horizon Zero Dawn",
    description: "Experience Aloy’s legendary quest to unravel the mysteries of a future Earth ruled by Machines. Use devastating tactical attacks against your prey and explore a majestic open world in this award-winning action RPG!",
    id: 1,
  },
  {
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2567870/header.jpg?t=1719621610",
    title: "Chained Together",
    description:
      "From the depths of hell, climb chained to your friends through diverse worlds. Solo or co-op, try to reach the summit and discover what awaits you there...t",
    id: 2,
  },
  {
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/105600/header.jpg?t=1666290860",
    title: "Terraria",
    description:
      "Dig, fight, explore, build! Nothing is impossible in this action-packed adventure game. Four Pack also available!",
    id: 3,
  },
  {
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/header.jpg?t=1719426374",
    title: "Counter Strike 2",
    description:
      "For over two decades, Counter-Strike has offered an elite competitive experience, one shaped by millions of players from across the globe. And now the next chapter in the CS story is about to begin. This is Counter-Strike 2.",
    id: 4,
  },
];

const FlexedBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: theme.spacing(3),
}));

const HomePage = () => {
  //Expected Flow:
  //Fetch all games from DB.
  //Populate GameCards with games data.
  return (
    <FlexedBox>
      <Grid
        container
        rowSpacing={6}
        columnSpacing={1}
        sx={{ maxWidth: "85rem" }}
      >
        {defaultGameCardData.map((gameData, index) => (
          <Grid
            xs={12}
            sm={6}
            md={4}
            lg={4}
            item
            key={index}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <GameCard key={index} {...gameData} />
          </Grid>
        ))}
      </Grid>
    </FlexedBox>
  );
};

export default HomePage;

