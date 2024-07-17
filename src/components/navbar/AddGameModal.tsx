import * as React from "react";
import {
  Box,
  Modal,
  Typography,
  Button,
  TextField,
  IconButton,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import muiTheme from "../../themes/muiTheme";
import { IGame } from "../../utils/types/types";

interface AddGameModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (game: IGame) => void;
}

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

const AddGameModal = ({ open, onClose, onSubmit }: AddGameModalProps) => {
  const [gameName, setGameName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [imageURL, setImageURL] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [releaseDate, setReleaseDate] = React.useState("");
  const [categories, setCategories] = React.useState<string[]>([]);
  const [platformLinks, setPlatformLinks] = React.useState<
    { platform: string; url: string }[]
  >([]);
  const [selectedPlatform, setSelectedPlatform] = React.useState<string>("");

  const supportedCategories = [
    "Action",
    "Adventure",
    "RPG",
    "Strategy",
    "Sandbox",
    "Puzzle",
    "Turn-Based",
    "First-Person-Shooter",
  ];
  const supportedPlatforms = ["Steam", "Origin", "Epic Games", "XBox"];

  const handleFormSubmit = () => {
    const newGame: IGame = {
      id: "",
      name: gameName,
      price: parseFloat(price),
      image: imageURL,
      description: description,
      developerId: "",
      platformLinks: platformLinks,
      releaseDate: new Date(releaseDate),
      views: 0,
      categories: categories,
    };

    onSubmit(newGame);
    onClose();
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCategories(event.target.value as string[]);
  };

  const handlePlatformChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const platformName = event.target.value as string;
    setSelectedPlatform(platformName);
    if (!platformLinks.find((platform) => platform.platform === platformName)) {
      setPlatformLinks((prevPlatforms) => [
        ...prevPlatforms,
        { platform: platformName, url: "" },
      ]);
    }
  };

  const handlePlatformUrlChange = (index: number, url: string) => {
    setPlatformLinks((prevPlatforms) => {
      const updatedPlatforms = [...prevPlatforms];
      updatedPlatforms[index].url = url;
      return updatedPlatforms;
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-game-modal"
      aria-describedby="modal-to-add-a-new-game"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ModalContent sx={{ backgroundColor: muiTheme.palette.primary.main }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            color: muiTheme.palette.text.secondary,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          sx={{ color: muiTheme.palette.text.secondary }}
          variant="h6"
          component="h2"
        >
          Add New Game
        </Typography>
        <CustomTextField
          label="Game Name"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <CustomTextField
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <CustomTextField
          label="Image URL"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
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
        <CustomTextField
          label="Release Date"
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
            style: { color: muiTheme.palette.text.secondary },
          }}
          sx={{ color: muiTheme.palette.text.secondary }}
        />
        <CustomTextField
          select
          label="Categories"
          value={categories}
          onChange={handleCategoryChange}
          fullWidth
          margin="normal"
          variant="outlined"
          SelectProps={{
            multiple: true,
            renderValue: (selected) => (selected as string[]).join(", "),
            MenuProps: {
              PaperProps: {
                style: {
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "left",
                  backgroundColor: muiTheme.palette.primary.main,
                  color: muiTheme.palette.text.secondary,
                },
              },
            },
          }}
          InputLabelProps={{
            style: { color: muiTheme.palette.text.secondary },
          }}
        >
          {supportedCategories.map((category) => (
            <MenuItem
              key={category}
              value={category}
              style={{ padding: "8px 16px" }} // Adjust padding as needed
            >
              <Checkbox
                checked={categories.includes(category)}
                style={{ color: muiTheme.palette.text.secondary }}
              />
              <ListItemText
                primary={category}
                primaryTypographyProps={{
                  style: { color: muiTheme.palette.text.secondary },
                }}
              />
            </MenuItem>
          ))}
        </CustomTextField>

        <CustomTextField
          select
          label="Platforms"
          value={selectedPlatform}
          onChange={handlePlatformChange}
          fullWidth
          margin="normal"
          variant="outlined"
          SelectProps={{
            displayEmpty: true,
            MenuProps: {
              PaperProps: {
                style: {
                  backgroundColor: muiTheme.palette.primary.main,
                  color: muiTheme.palette.text.secondary,
                },
              },
            },
          }}
          InputLabelProps={{
            style: { color: muiTheme.palette.text.secondary },
          }}
        >
          {supportedPlatforms.map((platform) => (
            <MenuItem key={platform} value={platform}>
              {platform}
            </MenuItem>
          ))}
        </CustomTextField>
        {platformLinks.map(
          (platform, index) =>
            platform.platform === selectedPlatform && (
              <CustomTextField
                key={index}
                label={`${platform.platform} URL`}
                value={platform.url}
                onChange={(e) => handlePlatformUrlChange(index, e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            )
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleFormSubmit}
          sx={{
            backgroundColor: muiTheme.palette.background.default,
            color: muiTheme.palette.secondary.main,
            "&:hover": {
              backgroundColor: muiTheme.palette.text.hover,
            },
            marginTop: "1rem",
          }}
        >
          Save
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default AddGameModal;
