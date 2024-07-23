import * as React from "react";
import {
  Box,
  Modal,
  Typography,
  Button,
  TextField,
  IconButton,
  MenuItem,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import muiTheme from "../themes/muiTheme";
import { supportedSocialNetworks } from "../utils/constants/supportedOptions";
import { useRef, useState } from "react";
import axios from "axios";
import { updateUserLink, uploadFileLink } from "../utils/constants/serverLink";
import { useNavigate } from "react-router-dom";
import { IUser } from "../utils/types/types";

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  user: IUser;
}

export type EditUserType = {
  name?: string;
  profileImage?: string;
  socialNetworks?: { platform: string; url: string }[];
  birthDate?: Date;
};

const ModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  flexDirection: "column",
  width: "40%",
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

const EditUserModal = ({ open, onClose, user }: EditProfileModalProps) => {
  const navigate = useNavigate();

  const [fileName, setFileName] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [socialNetworks, setSocialNetworks] = useState<
    { platform: string; url: string }[]
  >([]);

  const [selectedPlatform, setSelectedPlatform] = useState<string>("");

  const handleSubmit = async () => {
    const newUser: EditUserType = {};

    if (fileName !== null) {
      try {
        const imageData = new FormData();
        imageData.append("file", fileName as Blob);
        const uploadResponse = await axios.post(
          `${uploadFileLink}`,
          imageData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        newUser.profileImage = uploadResponse.data.file;
      } catch (error) {
        console.error("File upload failed:", error);
      }
    }

    if (name !== "") newUser.name = name;
    if (birthDate !== "") newUser.birthDate = new Date(birthDate);
    if (socialNetworks.length > 0) newUser.socialNetworks = socialNetworks;
    const token = localStorage.getItem("token") as string;

    await axios
      .put(updateUserLink, { token, updatedUser: newUser })
      .then(() => {
        onClose();
        navigate(`/profile/${user._id}`);
      });
  };

  const handlePlatformChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const platformName = event.target.value as string;
    setSelectedPlatform(platformName);
    if (
      !socialNetworks.find((platform) => platform.platform === platformName)
    ) {
      setSocialNetworks((prevPlatforms) => [
        ...prevPlatforms,
        { platform: platformName, url: "" },
      ]);
    }
  };

  const handlePlatformUrlChange = (index: number, url: string) => {
    setSocialNetworks((prevPlatforms) => {
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
      aria-labelledby="edit-user-modal"
      aria-describedby="modal-to-edit-a-new-user"
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
          Edit User
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <IconButton
            sx={{
              m: 1,
              p: 0,
              width: 56,
              height: 56,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: muiTheme.palette.secondary.contrastText,
            }}
            onClick={handleIconClick}
          >
            <Avatar
              src={imageUrl || undefined}
              sx={{ width: 56, height: 56 }}
            />
          </IconButton>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*"
          />
          {fileName && (
            <Typography sx={{ color: muiTheme.palette.text.secondary }}>
              {fileName.name}
            </Typography>
          )}
        </Box>
        <CustomTextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <CustomTextField
          label="Birth Date"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
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
          label="Social Network"
          value={selectedPlatform}
          onChange={handlePlatformChange}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            style: { color: muiTheme.palette.text.secondary },
          }}
        >
          {supportedSocialNetworks.map((platform) => (
            <MenuItem key={platform} value={platform}>
              {platform}
            </MenuItem>
          ))}
        </CustomTextField>
        {socialNetworks.map(
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
                InputLabelProps={{
                  style: { color: muiTheme.palette.text.secondary },
                }}
              />
            )
        )}
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

export default EditUserModal;
