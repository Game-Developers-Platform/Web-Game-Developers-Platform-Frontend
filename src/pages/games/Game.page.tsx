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
  const [categoriesString, setCategoriesString] = useState<string>("");

  const isMyGame = game?.developerId?._id === userId;

  const fetchGame = async () => {
    const response = await axios.get(`${gameLink}${gameId}`);
    setGame(response.data);
    setCategoriesString(response.data.categories.join(" | "));
  };

  const fetchCurrencies = async () => {
    const response = await axios.get(`${currencyLink}`);
    setCurrencies(response.data);
  };

  useEffect(() => {
    fetchGame();
  }, []);

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
            maxWidth: { xs: 300, sm: 400, md: 450, lg: 450 },
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
            Categories
          </Typography>
          <Typography
            sx={{
              color: muiTheme.palette.text.details,
              textAlign: "center",
            }}
          >
            {categoriesString}
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
              sx={{
                minWidth: 115,
                marginRight: 5,
                "& .MuiFormLabel-root": {
                  color: muiTheme.palette.text.secondary,
                },
                "& .MuiFormLabel-root.Mui-focused": {
                  color: muiTheme.palette.text.secondary,
                },
                "& .MuiOutlinedInput-root": {
                  height: 40,
                  "& fieldset": {
                    borderColor: muiTheme.palette.text.primary,
                  },
                  "&:hover fieldset": {
                    borderColor: muiTheme.palette.text.primary,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: muiTheme.palette.text.primary,
                  },
                },
              }}
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
                  height: 40,
                  "& .MuiSelect-select": {
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  },
                  "& .MuiSelect-icon": {
                    color: muiTheme.palette.text.secondary,
                  },
                  width: "115px",
                }}
              >
                {currencies.map((currency) => (
                  <MenuItem
                    key={currency.name}
                    value={currency.name}
                    style={{
                      padding: "8px 16px",
                      textAlign: "center",
                    }}
                  >
                    <ListItemText
                      primary={currency.name}
                      primaryTypographyProps={{
                        style: {
                          color: muiTheme.palette.text.secondary,
                          textAlign: "center",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        },
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
                  border: `1px solid ${muiTheme.palette.text.primary}`,
                  borderRadius: 1,
                  padding: "4px 8px",
                  textAlign: "center",
                  marginLeft: 2,
                  lineHeight: "24px",
                }}
              >
                {convertedPrice.toFixed(2)} {selectedCurrency}
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
                    style={{ width: 38, height: 38 }}
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
              onClick={handleProfileClick}
            >
              {isMyGame ? "My Profile" : "Developer's Profile"}
            </Button>
            {!isMyGame && (
              <Button
                variant="contained"
                sx={{
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
          </Box>
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
              marginBottom: 2,
              marginTop: 2,
            }}
          >
            Comments
          </Typography>
        )}
        {game.comments?.length > 0 && (
          <FlexedBox sx={{ width: "100%", mb: 3 }}>
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
