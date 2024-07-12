import { Box, Grid, styled } from "@mui/material";
import StoreCard from "../../component/storeCard/StoreCard";

const defaultStoreCardData = [
  {
    backgroundImage: "https://picsum.photos/200",
    title: "עברית",
    description: "כאן יש תיאור בעברית בשביל לבדוק את הנתונים.",
    id: 1,
  },
  {
    backgroundImage: "https://picsum.photos/200",
    title: "Title",
    description:
      "Description of the store card data goes here and it can be as long as you want",
    id: 2,
  },
  {
    backgroundImage: "https://picsum.photos/200",
    title: "Title",
    description:
      "Description of the store card data goes here and it can be as long as you want",
    id: 3,
  },
  {
    backgroundImage: "https://picsum.photos/200",
    title: "Title",
    description:
      "Description of the store card data goes here and it can be as long as you want",
    id: 4,
  },
];

const FlexedBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: theme.spacing(3),
}));
//TODO -> replace with the actual data from DB.
const HomePage = () => {
  return (
    <FlexedBox>
      <Grid
        container
        rowSpacing={6}
        columnSpacing={1}
        sx={{ maxWidth: "85rem" }}
      >
        {defaultStoreCardData.map((storeCardData, index) => (
          <Grid
            xs={12}
            sm={6}
            md={4}
            lg={4}
            item
            key={index}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <StoreCard key={index} {...storeCardData} />
          </Grid>
        ))}
      </Grid>
    </FlexedBox>
  );
};

export default HomePage;
