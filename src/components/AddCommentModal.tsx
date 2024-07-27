import { Box, Modal, Typography, Button, TextField } from "@mui/material";
import { styled } from "@mui/system";
import muiTheme from "../themes/muiTheme";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { commentLink, gameLink } from "../utils/constants/serverLink";

interface AddCommentModalProps {
  open: boolean;
  onClose: () => void;
  gameId: string;
}

export type NewCommentType = {
  description: string;
  userId: string;
  gameId: string;
};

const ModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  flexDirection: "column",
  width: "30%",
  maxWidth: "90vw",
  margin: "auto",
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    color: muiTheme.palette.text.secondary,
  },
  "& .MuiInputLabel-root": {
    color: muiTheme.palette.text.secondary,
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius,
    marginTop: 0,
  },
}));

const AddCommentModal = ({ open, onClose, gameId }: AddCommentModalProps) => {
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const connectedUser = localStorage.getItem("userId");

  useEffect(() => {
    // Clear error when description changes
    setError("");
  }, [description]);

  const validateDescription = () => {
    if (description.length < 2 || description.length > 120) {
      setError("Description must be between 2-120 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateDescription()) {
      return;
    }

    try {
      const newComment: NewCommentType = {
        description: description,
        userId: connectedUser as string,
        gameId: gameId,
      };

      await axios
        .post(`${commentLink}`, newComment)
        .then((response) => response.data)
        .then((response) => {
          axios
            .put(`${gameLink}addComment/${gameId}`, {
              commentId: response._id,
            })
            .then(() => {
              setDescription("");
              onClose();
              navigate(`/game/${gameId}`);
            });
        });
    } catch (error) {
      console.error("Creating new comment failed:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-comment-modal"
      aria-describedby="modal-to-add-a-new-comment"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ModalContent
        sx={{
          maxHeight: "90%",
          overflowY: "auto",
          overflowX: "hidden",
          backgroundColor: muiTheme.palette.primary.main,
        }}
      >
        <Typography
          sx={{ color: muiTheme.palette.text.secondary }}
          variant="h6"
          component="h2"
        >
          Add New Comment
        </Typography>
        <CustomTextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="normal"
          variant="outlined"
          error={!!error}
          helperText={error}
        />
        <Button
          onClick={handleSubmit}
          sx={{
            backgroundColor: muiTheme.palette.text.details,
            color: muiTheme.palette.primary.contrastText,
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: muiTheme.palette.text.hover,
            },
            marginTop: "1rem",
          }}
        >
          Submit
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default AddCommentModal;
