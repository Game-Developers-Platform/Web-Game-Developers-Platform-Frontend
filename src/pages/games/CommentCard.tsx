import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import muiTheme from "../../themes/muiTheme";
import { IGame, IUser } from "../../utils/types/types";
import { useEffect, useState } from "react";
import {
  commentLink,
  gameLink,
  userLink,
} from "../../utils/constants/serverLink";
import axios from "axios";
import EditCommentModal from "../../components/EditCommentModal";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface CommentCardProps {
  userId: IUser;
  gameId: IGame;
  _id: string;
  description: string;
}

const CommentCard: React.FC<CommentCardProps> = ({
  userId,
  gameId,
  _id,
  description: initialDescription,
}) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [writerName, setWriterName] = useState("");
  const [description, setDescription] = useState(initialDescription);

  const isMyComment = localStorage.getItem("userId") === String(userId);

  const handleOpenEditModal = () => setEditModalOpen(true);
  const handleCloseEditModal = () => setEditModalOpen(false);
  const handleOpenDeleteDialog = () => setDeleteDialogOpen(true);
  const handleCloseDeleteDialog = () => setDeleteDialogOpen(false);

  useEffect(() => {
    const fetchWriterName = async () => {
      try {
        const response = await axios.get(`${userLink}${userId}`);
        setWriterName(response.data.name);
      } catch (error) {
        console.error("Fetch writer name failed:", error);
      }
    };
    fetchWriterName();
  }, [userId]);

  const handleDeleteComment = async () => {
    try {
      await axios
        .delete(`${commentLink}/${_id}`)
        .then((response) => response.data)
        .then((response) => {
          axios.put(`${gameLink}removeComment/${gameId}`, {
            commentId: response._id,
          });
          handleCloseDeleteDialog();
          window.location.reload();
        });
    } catch (error) {
      console.error("Delete comment failed:", error);
    }
  };

  const handleEditComplete = (updatedDescription: string) => {
    setDescription(updatedDescription);
    setEditModalOpen(false);
  };

  return (
    <Card
      key={_id}
      sx={{
        width: 200,
        height: 175,
        display: "flex",
        flexDirection: "column",
        backgroundColor: muiTheme.palette.secondary.main,
        borderRadius: "16px",
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
        transition: "box-shadow 0.3s ease-in-out, transform 0.1s ease-in-out",
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ color: muiTheme.palette.text.secondary }}
          gutterBottom
          variant="h5"
          component="div"
        >
          {writerName ? "By: " + writerName : "Writer Name..."}
        </Typography>
        <Typography
          sx={{
            color: muiTheme.palette.text.secondary,
            wordBreak: "break-word",
            whiteSpace: "normal",
            overflowWrap: "break-word",
            width: "85%",
          }}
          variant="body2"
          color="text.secondary"
        >
          {description}
        </Typography>
      </CardContent>
      {isMyComment && (
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Button
            sx={{ color: muiTheme.palette.text.details }}
            size="small"
            onClick={handleOpenEditModal}
          >
            Edit
          </Button>
          <Button
            sx={{ color: muiTheme.palette.text.delete }}
            size="small"
            onClick={handleOpenDeleteDialog}
          >
            Delete
          </Button>
        </CardActions>
      )}
      {isEditModalOpen && (
        <EditCommentModal
          open={isEditModalOpen}
          onClose={handleCloseEditModal}
          commentId={_id}
          gameId={gameId}
          initialDescription={description}
          onEditComplete={handleEditComplete}
        />
      )}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: muiTheme.palette.primary.main,
          },
        }}
      >
        <DialogTitle sx={{ color: muiTheme.palette.text.secondary }}>
          Delete Comment
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this comment? This action cannot be
            undone.
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
            onClick={handleCloseDeleteDialog}
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
            onClick={handleDeleteComment}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default CommentCard;
