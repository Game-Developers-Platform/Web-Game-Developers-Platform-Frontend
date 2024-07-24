import { Box, Modal, Typography, Button, TextField } from "@mui/material";
import { styled } from "@mui/system";
import muiTheme from "../themes/muiTheme";
import { useState } from "react";
import axios from "axios";
import { commentLink } from "../utils/constants/serverLink";

interface EditCommentModalProps {
  open: boolean;
  onClose: () => void;
  commentId: string;
}

export type NewCommentType = {
  description: string;
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

const EditCommentModal = ({
  open,
  onClose,
  commentId,
}: EditCommentModalProps) => {
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    try {
      const newComment: NewCommentType = {
        description: description,
      };

      await axios.put(`${commentLink}/${commentId}`, newComment);
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
          margin="normal"
          variant="outlined"
        />
        <Button
          onClick={handleSubmit}
          sx={{
            backgroundColor: muiTheme.palette.primary.light,
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

export default EditCommentModal;
