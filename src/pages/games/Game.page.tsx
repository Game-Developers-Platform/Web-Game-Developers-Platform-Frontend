import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  ListItemText,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import muiTheme from "../../themes/muiTheme";
import {
  currencyLink,
  gameLink,
  serverLink,
  userLink,
} from "../../utils/constants/serverLink.ts";
import { IComment, ICurrency, IGame } from "../../utils/types/types.ts";
import { useEffect, useState } from "react";
import axios from "axios";
import { platformLogoMap } from "../../utils/constants/platformsSupport.ts";
import EditGameModal from "../../components/EditGameModal.tsx";
import styled from "styled-components";
import CommentCard from "./CommentCard.tsx";
import AddCommentModal from "../../components/AddCommentModal.tsx";

const FlexedBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: muiTheme.spacing(3),
}));

const GamePage = () => {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const userId = localStorage.getItem("userId");

  const [game, setGame] = useState<IGame>({} as IGame);
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddCommentModalOpen, setAddCommentModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [convertedPrice, setConvertedPrice] = useState<number>(0);

  const isMyGame = game?.developerId?._id === userId;

  const fetchGame = async () => {
    const response = await axios.get(`${gameLink}${gameId}`);
    setGame(response.data);
  };

  const fetchCurrencies = async () => {
    const response = await axios.get(`${currencyLink}`);
    setCurrencies(response.data);
  };

  useEffect(() => {
    fetchGame();
  }, [gameId, game]);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const handleProfileClick = () => {
    navigate(`/profile/${game.developerId._id}`);
  };

  const handleEditGameClick = () => {
    setModalOpen(true);
  };

  const handleDeleteGameClick = () => {
    setDeleteModalOpen(true);
  };

  const handleEditCloseModal = () => {
    fetchGame();
    setModalOpen(false);
  };

  const handleCommentModalClose = () => {
    fetchGame();
    setAddCommentModalOpen(false);
  };

  const handleCommentModalOpen = () => {
    setAddCommentModalOpen(true);
  };

  const handleDeleteGame = async () => {
    try {
      await axios
        .delete(`${gameLink}${gameId}`)
        .then((response) => response.data)
        .then((response) => {
          axios
            .put(`${userLink}removeGame/${userId}`, {
              gameId: response._id,
            })
            .then(() => {
              setDeleteModalOpen(false);
              navigate(`/myGames/${userId}`);
            });
        });
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  const handleCurrencyChange = (event: SelectChangeEvent<string>) => {
    const currency = event.target.value;
    setSelectedCurrency(currency);
    const selectedCurrencyObj = currencies.find((cur) => cur.name === currency);
    if (selectedCurrencyObj) {
      const rate = selectedCurrencyObj.exchangeRate;
      setConvertedPrice(Number((game.price * rate).toFixed(2)));
    }
  };

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
            maxWidth: { xs: 300, sm: 400, md: 450, lg: 450 },
            maxHeight: 200,
            height: "auto",
            borderRadius: 1,
            boxShadow: 3,
            transition: "max-width 0.3s ease-in-out",
            marginBottom: 2,
          }}
          alt={game.name}
          src={serverLink + game.image}
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
        {game.price > 0 && (
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <FormControl
              variant="outlined"
              sx={{ minWidth: 80, marginRight: 5 }}
            >
              <InputLabel id="currency-select-label">Currency</InputLabel>
              <Select
                labelId="currency-select-label"
                id="currency-select"
                value={selectedCurrency}
                onChange={handleCurrencyChange}
                label="Currency"
                MenuProps={{
                  PaperProps: {
                    style: {
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "left",
                      backgroundColor: muiTheme.palette.primary.main,
                      color: muiTheme.palette.text.secondary,
                      height: "11rem",
                    },
                  },
                }}
                sx={{
                  "& .MuiSelect-select": {
                    height: 16,
                    display: "flex",
                    alignItems: "center",
                  },
                }}
              >
                {currencies.map((currency) => (
                  <MenuItem
                    key={currency.name}
                    value={currency.name}
                    style={{ padding: "8px 16px" }}
                  >
                    <ListItemText
                      primary={currency.name}
                      primaryTypographyProps={{
                        style: { color: muiTheme.palette.text.secondary },
                      }}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedCurrency && (
              <Typography
                sx={{
                  color: muiTheme.palette.text.secondary,
                }}
              >
                {convertedPrice}
              </Typography>
            )}
          </Box>
        )}
        {game?.platformLinks?.length > 0 && (
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
              {game?.platformLinks?.map((platformLink) => (
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
        )}
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
              marginBottom: 1,
            }}
          >
            {game.developerId?.name}
          </Typography>
          <Button
            variant="contained"
            sx={{
              marginTop: "1rem",
              backgroundColor: muiTheme.palette.background.default,
              color: muiTheme.palette.text.secondary,
              "&:hover": {
                backgroundColor: muiTheme.palette.text.hover,
              },
            }}
            onClick={handleProfileClick}
          >
            {isMyGame ? "My Profile" : "Developer's Profile"}
          </Button>
          {!isMyGame && (
            <Button
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: muiTheme.palette.background.default,
                color: muiTheme.palette.text.secondary,
                "&:hover": {
                  backgroundColor: muiTheme.palette.text.hover,
                },
              }}
              onClick={handleCommentModalOpen}
            >
              Add Comment
            </Button>
          )}
          {isMyGame && (
            <Box sx={{ display: "flex", gap: 2, marginTop: "1rem" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: muiTheme.palette.background.default,
                  color: muiTheme.palette.text.secondary,
                  "&:hover": {
                    backgroundColor: muiTheme.palette.text.hover,
                  },
                }}
                onClick={handleEditGameClick}
              >
                Edit Game
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: muiTheme.palette.text.delete,
                  color: muiTheme.palette.common.white,
                  "&:hover": {
                    backgroundColor: muiTheme.palette.text.deleteHover,
                  },
                }}
                onClick={handleDeleteGameClick}
              >
                Delete Game
              </Button>
            </Box>
          )}
        </Box>
        {game.comments?.length > 0 && (
          <Typography
            variant="h5"
            sx={{
              color: muiTheme.palette.text.secondary,
              marginBottom: 0.5,
            }}
          >
            Comments
          </Typography>
        )}
        {game.comments?.length > 0 && (
          <FlexedBox sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={6}
              columnSpacing={1}
              justifyContent="center"
            >
              {game?.comments?.map((comment: IComment, index: number) => (
                <Grid
                  xs={6}
                  sm={4}
                  md={3}
                  lg={2}
                  item
                  key={index}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <CommentCard {...comment} />
                </Grid>
              ))}
            </Grid>
          </FlexedBox>
        )}
      </Grid>

      <AddCommentModal
        open={isAddCommentModalOpen}
        onClose={handleCommentModalClose}
        gameId={gameId as string}
      />

      <EditGameModal
        open={modalOpen}
        onClose={handleEditCloseModal}
        game={game}
      />

      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: muiTheme.palette.primary.main,
          },
        }}
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <DialogTitle sx={{ color: muiTheme.palette.text.secondary }}>
          Delete Game
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete{" "}
            <span
              style={{
                fontWeight: "bold",
                color: muiTheme.palette.text.delete,
              }}
            >
              {game.name}
            </span>
            ? This action is not reversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: muiTheme.palette.text.details,
              color: muiTheme.palette.text.secondary,
              "&:hover": {
                backgroundColor: muiTheme.palette.text.hover,
              },
            }}
            onClick={() => setDeleteModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            sx={{
              backgroundColor: muiTheme.palette.text.delete,
              color: muiTheme.palette.text.secondary,
              "&:hover": {
                backgroundColor: muiTheme.palette.text.deleteHover,
              },
            }}
            onClick={handleDeleteGame}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GamePage;
