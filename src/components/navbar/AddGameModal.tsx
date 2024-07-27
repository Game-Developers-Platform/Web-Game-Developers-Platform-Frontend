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
import muiTheme from "../../themes/muiTheme";
import {
  supportedPlatforms,
  supportedCategories,
} from "../../utils/constants/supportedOptions";
import { useRef, useState } from "react";
import axios from "axios";
import { fileLink, gameLink, userLink } from "../../utils/constants/serverLink";
import { useNavigate } from "react-router-dom";

interface AddGameModalProps {
  open: boolean;
  onClose: () => void;
}

export type PlatformLink = {
  platform: string;
  url: string;
};

export type NewGameType = {
  name: string;
  price: number;
  image: string;
  description: string;
  developerId: string;
  platformLinks: PlatformLink[];
  releaseDate: Date;
  categories: string[];
};

interface FormErrors {
  name: string;
  price: string;
  image: string;
  description: string;
  releaseDate: string;
  categories: string;
  platformLinks: string;
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

const AddGameModal = ({ open, onClose }: AddGameModalProps) => {
  const navigate = useNavigate();

  const [fileName, setFileName] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [gameName, setGameName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [platformLinks, setPlatformLinks] = useState<PlatformLink[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const connectedUser = localStorage.getItem("userId");

  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    price: "",
    image: "",
    description: "",
    releaseDate: "",
    categories: "",
    platformLinks: "",
  });

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {
      name: "",
      price: "",
      image: "",
      description: "",
      releaseDate: "",
      categories: "",
      platformLinks: "",
    };

    if (gameName.length < 2 || gameName.length > 40) {
      newErrors.name = "Game name must be between 2 and 40 characters";
      isValid = false;
    }

    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue < 0 || priceValue > 300) {
      newErrors.price = "Price must be between 0 and 300";
      isValid = false;
    }

    if (!fileName) {
      newErrors.image = "An image is required";
      isValid = false;
    }

    if (description.length < 10 || description.length > 300) {
      newErrors.description =
        "Description must be between 10 and 300 characters";
      isValid = false;
    }

    if (!releaseDate) {
      newErrors.releaseDate = "Release date is required";
      isValid = false;
    }

    if (categories.length === 0) {
      newErrors.categories = "At least one category is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const imageData = new FormData();
      imageData.append("file", fileName as Blob);
      const uploadResponse = await axios.post(`${fileLink}`, imageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const filteredPlatformLinks = platformLinks.filter(
        (platformLink) => platformLink.url !== ""
      );

      const newGame: NewGameType = {
        name: gameName,
        price: parseFloat(price),
        image: uploadResponse.data.file,
        description: description,
        developerId: connectedUser as string,
        platformLinks: filteredPlatformLinks,
        releaseDate: new Date(releaseDate),
        categories: categories,
      };

      await axios
        .post(`${gameLink}`, newGame)
        .then((response) => response.data)
        .then((response) => {
          axios
            .put(`${userLink}addGame/${connectedUser}`, {
              gameId: response._id,
            })
            .then(() => {
              onClose();
              navigate(`/myGames/${connectedUser}`);
              window.location.reload();
            });
        });
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const value = event.target.value as string[];
    setCategories(value);
    setErrors({ ...errors, categories: "" });
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
    setErrors({ ...errors, platformLinks: "" });
  };

  const handlePlatformUrlChange = (index: number, url: string) => {
    setPlatformLinks((prevPlatforms) => {
      const updatedPlatforms = [...prevPlatforms];
      updatedPlatforms[index].url = url;
      return updatedPlatforms;
    });
    setErrors({ ...errors, platformLinks: "" });
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
      setErrors({ ...errors, image: "" });
    }
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
      <ModalContent
        sx={{
          height: "90%",
          overflowY: "auto",
          overflowX: "hidden",
          backgroundColor: muiTheme.palette.primary.main,
        }}
      >
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
          variant="h5"
          align="center"
          gutterBottom
        >
          Add a New Game
        </Typography>
        <ImageBox imageUrl={imageUrl} onClick={handleIconClick}>
          {!imageUrl && (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              <AddAPhotoIcon
                sx={{
                  fontSize: "4rem",
                  color: muiTheme.palette.text.secondary,
                }}
              />
            </>
          )}
        </ImageBox>
        {errors.image && (
          <Typography color="error" variant="body2" align="center">
            {errors.image}
          </Typography>
        )}
        <CustomTextField
          label="Game Name"
          fullWidth
          value={gameName}
          onChange={(e) => {
            setGameName(e.target.value);
            setErrors({ ...errors, name: "" });
          }}
          error={Boolean(errors.name)}
          helperText={errors.name}
          margin="normal"
        />
        <CustomTextField
          label="Price"
          type="number"
          fullWidth
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            setErrors({ ...errors, price: "" });
          }}
          error={Boolean(errors.price)}
          helperText={errors.price}
          margin="normal"
        />
        <CustomTextField
          label="Description"
          fullWidth
          multiline
          minRows={4}
          maxRows={6}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setErrors({ ...errors, description: "" });
          }}
          error={Boolean(errors.description)}
          helperText={errors.description}
          margin="normal"
        />
        <CustomTextField
          label="Release Date"
          type="date"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          value={releaseDate}
          onChange={(e) => {
            setReleaseDate(e.target.value);
            setErrors({ ...errors, releaseDate: "" });
          }}
          error={Boolean(errors.releaseDate)}
          helperText={errors.releaseDate}
          margin="normal"
        />
        <TextField
          select
          label="Category"
          fullWidth
          value={categories}
          onChange={handleCategoryChange}
          error={Boolean(errors.categories)}
          helperText={errors.categories}
          margin="normal"
          SelectProps={{
            multiple: true,
            renderValue: (selected) => (selected as string[]).join(", "),
          }}
          InputProps={{
            style: {
              color: muiTheme.palette.text.secondary,
              marginTop: "10px",
            },
          }}
        >
          {supportedCategories.map((category) => (
            <MenuItem key={category} value={category}>
              <Checkbox checked={categories.indexOf(category) > -1} />
              <ListItemText primary={category} />
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Platform"
          fullWidth
          value={selectedPlatform}
          onChange={handlePlatformChange}
          error={Boolean(errors.platformLinks)}
          helperText={errors.platformLinks}
          margin="normal"
          InputProps={{
            style: {
              color: muiTheme.palette.text.secondary,
              marginTop: "10px",
            },
          }}
        >
          {supportedPlatforms.map((platform) => (
            <MenuItem key={platform} value={platform}>
              {platform}
            </MenuItem>
          ))}
        </TextField>
        {platformLinks.map((link, index) => (
          <CustomTextField
            key={index}
            label={`${link.platform} URL`}
            fullWidth
            value={link.url}
            onChange={(e) => handlePlatformUrlChange(index, e.target.value)}
            margin="normal"
            error={Boolean(errors.platformLinks)}
            helperText={errors.platformLinks}
          />
        ))}
        <Button
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
          Submit
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default AddGameModal;
