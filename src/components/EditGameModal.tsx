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
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { styled } from "@mui/system";
import muiTheme from "../themes/muiTheme";
import {
  supportedPlatforms,
  supportedCategories,
} from "../utils/constants/supportedOptions";
import { useRef, useState } from "react";
import axios from "axios";
import { gameLink, fileLink } from "../utils/constants/serverLink";
import { useNavigate } from "react-router-dom";
import { IGame } from "../utils/types/types";

interface EditGameModalProps {
  open: boolean;
  onClose: () => void;
  game: IGame;
}

export type EditGameType = {
  name?: string;
  price?: number;
  image?: string;
  description?: string;
  platformLinks?: { platform: string; url: string }[];
  releaseDate?: Date;
  categories?: string[];
};

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

const ImageBox = styled(Box, {
  shouldForwardProp: (props) => props !== "imageUrl",
})<{ imageUrl: string | null }>(({ theme, imageUrl }) => ({
  width: "100%",
  height: 150,
  backgroundImage: `url(${imageUrl})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  border: `1px solid ${theme.palette.text.secondary}`,
  flexShrink: 0,
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

const EditGameModal = ({ open, onClose, game }: EditGameModalProps) => {
  const navigate = useNavigate();

  const [fileName, setFileName] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [gameName, setGameName] = useState(game.name || "");
  const [price, setPrice] = useState(game.price?.toString() || "");
  const [description, setDescription] = useState(game.description || "");
  const [releaseDate, setReleaseDate] = useState(
    game.releaseDate
      ? new Date(game.releaseDate).toISOString().split("T")[0]
      : ""
  );
  const [categories, setCategories] = useState<string[]>(game.categories || []);
  const [platformLinks, setPlatformLinks] = useState<
    { platform: string; url: string }[]
  >(game.platformLinks || []);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");

  const [errors, setErrors] = useState({
    gameName: "",
    price: "",
    description: "",
    releaseDate: "",
    platformLinks: "",
  });

  const validateForm = () => {
    const newErrors = {
      gameName: "",
      price: "",
      description: "",
      releaseDate: "",
      platformLinks: "",
    };

    let isValid = true;

    if (
      gameName.trim() !== "" &&
      (gameName.length < 2 || gameName.length > 40)
    ) {
      newErrors.gameName = "Game name must be between 2 and 40 characters";
      isValid = false;
    }

    if (
      price.trim() !== "" &&
      (isNaN(parseFloat(price)) ||
        parseFloat(price) <= 0 ||
        parseFloat(price) > 300)
    ) {
      newErrors.price = "Price must be between 0 and 300";
      isValid = false;
    }

    if (
      description.trim() !== "" &&
      (description.length < 10 || description.length > 300)
    ) {
      newErrors.description =
        "Description must be between 10 and 300 characters";
      isValid = false;
    }

    if (releaseDate.trim() !== "" && isNaN(Date.parse(releaseDate))) {
      newErrors.releaseDate = "Valid Release Date is required.";
      isValid = false;
    }

    if (platformLinks.some((link) => link.url.trim() === "")) {
      newErrors.platformLinks = "All chosen platform URLs must be provided.";
      isValid = false;
    }

    if (
      gameName.trim() === "" &&
      price.trim() === "" &&
      description.trim() === "" &&
      releaseDate.trim() === "" &&
      categories.length === 0 &&
      platformLinks.length === 0
    ) {
      onClose();
      return false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    const isValid = validateForm();
    if (!isValid) return;

    const updatedGame: EditGameType = {};

    if (fileName !== null) {
      try {
        const imageData = new FormData();
        imageData.append("file", fileName as Blob);
        const uploadResponse = await axios.post(`${fileLink}`, imageData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        updatedGame.image = uploadResponse.data.file;
      } catch (error) {
        console.error("File upload failed:", error);
      }
    }

    if (gameName !== "") updatedGame.name = gameName;
    if (price !== "" && !isNaN(parseFloat(price)))
      updatedGame.price = parseFloat(price);
    if (description !== "") updatedGame.description = description;
    if (releaseDate !== "" && !isNaN(Date.parse(releaseDate)))
      updatedGame.releaseDate = new Date(releaseDate);
    if (categories.length > 0) updatedGame.categories = categories;
    if (platformLinks.length > 0) updatedGame.platformLinks = platformLinks;

    try {
      await axios.put(`${gameLink}${game._id}`, updatedGame);
      onClose();
      navigate(`/myGames/${localStorage.getItem("userId")}`);
    } catch (error) {
      console.error("Failed to update game:", error);
    }
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

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file);

      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-game-modal"
      aria-describedby="modal-to-edit-a-game"
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
          Edit Game
        </Typography>
        <ImageBox imageUrl={imageUrl} onClick={handleIconClick}>
          {!imageUrl && (
            <AddAPhotoIcon sx={{ color: muiTheme.palette.text.secondary }} />
          )}
        </ImageBox>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <CustomTextField
          label="Game Name"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.gameName}
          helperText={errors.gameName}
        />
        <CustomTextField
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          type="text"
          error={!!errors.price}
          helperText={errors.price}
        />
        <CustomTextField
          multiline
          rows={4}
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.description}
          helperText={errors.description}
        />
        <CustomTextField
          type="date"
          label="Release Date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
            style: { color: muiTheme.palette.text.secondary },
          }}
          error={!!errors.releaseDate}
          helperText={errors.releaseDate}
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
                  height: "11rem",
                },
              },
            },
          }}
          InputLabelProps={{
            style: { color: muiTheme.palette.text.secondary },
          }}
        >
          {supportedCategories.map((category) => (
            <MenuItem key={category} value={category}>
              <Checkbox
                checked={categories.includes(category)}
                sx={{ color: muiTheme.palette.text.secondary }}
              />
              <ListItemText primary={category} />
            </MenuItem>
          ))}
        </CustomTextField>
        <CustomTextField
          select
          label="Select Platform"
          value={selectedPlatform}
          onChange={handlePlatformChange}
          fullWidth
          margin="normal"
          variant="outlined"
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
          (platformLink, index) =>
            platformLink.platform === selectedPlatform && (
              <CustomTextField
                key={platformLink.platform}
                label={`${platformLink.platform} URL`}
                value={platformLink.url}
                onChange={(e) =>
                  handlePlatformUrlChange(index, e.target.value as string)
                }
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.platformLinks}
                helperText={errors.platformLinks}
              />
            )
        )}
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            marginTop: 2,
            backgroundColor: muiTheme.palette.background.default,
            color: muiTheme.palette.text.secondary,
            "&:hover": {
              backgroundColor: muiTheme.palette.text.hover,
            },
          }}
        >
          Save Changes
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default EditGameModal;
