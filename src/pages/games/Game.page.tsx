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
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import muiTheme from "../../themes/muiTheme";
import { serverLink } from "../../utils/constants/serverLink.ts";
import { IGame, IUser } from "../../utils/types/types.ts";
import { useEffect, useState } from "react";
import axios from "axios";
import { platformLogoMap } from "../../utils/constants/platformsSupport.ts";
import EditGameModal from "../../components/EditGameModal.tsx";

const GamePage = () => {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const userId = localStorage.getItem("userId");

  const [game, setGame] = useState<IGame>({} as IGame);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const isMyGame = game?.developerId?._id === userId;

  const fetchGame = async () => {
    const response = await axios.get(`${serverLink}/games/${gameId}`);
    setGame(response.data);
  };

  useEffect(() => {
    fetchGame();
  }, [gameId]);

  const handleProfileClick = () => {
    navigate(`/profile/${game.developerId._id}`);
  };

  const handleEditGameClick = () => {
    setModalOpen(true);
  };

  const handleDeleteGameClick = () => {
    setDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    fetchGame();
    setModalOpen(false);
  };

  const handleDeleteGame = async () => {
    try {
      await axios.delete(`${serverLink}/games/${gameId}`);
      setDeleteModalOpen(false);
      navigate(`/myGames/${userId}`);
    } catch (error) {
      console.error("Error deleting game:", error);
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
            maxWidth: { xs: 300, sm: 400, md: 500, lg: 600 },
            height: "auto",
            borderRadius: 1,
            boxShadow: 3,
            transition: "max-width 0.3s ease-in-out",
            marginBottom: 2,
          }}
          alt={game.name}
          src={serverLink + "/" + game.image}
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
      </Grid>

      <EditGameModal open={modalOpen} onClose={handleCloseModal} game={game} />

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
