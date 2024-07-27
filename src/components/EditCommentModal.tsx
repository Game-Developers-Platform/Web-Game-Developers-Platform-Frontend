import { Box, Modal, Typography, Button, TextField } from "@mui/material";
import { styled } from "@mui/system";
import muiTheme from "../themes/muiTheme";
import { useEffect, useState } from "react";
import axios from "axios";
import { commentLink } from "../utils/constants/serverLink";
import { IGame } from "../utils/types/types";

interface EditCommentModalProps {
  open: boolean;
  onClose: () => void;
  commentId: string;
  gameId: IGame;
  initialDescription: string;
  onEditComplete: (updatedDescription: string) => void;
}

const ModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  flexDirection: "column",
  width: "30%",
  maxWidth: "90vw",
  maxHeight: "80vh",
  overflowY: "auto",
  overflowX: "hidden",
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

const EditCommentModal: React.FC<EditCommentModalProps> = ({
  open,
  onClose,
  commentId,
  initialDescription,
  onEditComplete,
}) => {
  const [description, setDescription] = useState(initialDescription);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [description]);

  const validateDescription = () => {
    if (description.length < 2 || description.length > 60) {
      setError("Description must be between 2-60 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateDescription()) {
      return;
    }

    try {
      const updatedComment = { description };

      const response = await axios.put(
        `${commentLink}/${commentId}`,
        updatedComment
      );
      onEditComplete(response.data.description);
      onClose();
    } catch (error) {
      console.error("Edit comment failed:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-comment-modal"
      aria-describedby="modal-to-edit-a-comment"
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
          Edit Comment
        </Typography>
        <CustomTextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
          error={!!error}
          helperText={error}
          sx={{
            marginTop: 2,
            color: muiTheme.palette.text.secondary,
            borderColor: muiTheme.palette.text.secondary,
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <Button
            sx={{
              backgroundColor: muiTheme.palette.text.delete,
              color: muiTheme.palette.text.secondary,
              "&:hover": {
                backgroundColor: muiTheme.palette.text.deleteHover,
              },
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            sx={{
              backgroundColor: muiTheme.palette.text.details,
              color: muiTheme.palette.text.secondary,
              "&:hover": {
                backgroundColor: muiTheme.palette.text.hover,
              },
            }}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default EditCommentModal;
