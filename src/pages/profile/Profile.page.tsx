import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import GameCard from "../../components/GameCard";
import muiTheme from "../../themes/muiTheme";
import { useNavigate, useParams } from "react-router-dom";
import { IGame, IUser } from "../../utils/types/types.ts";
import { serverLink } from "../../utils/constants/serverLink.ts";
import axios from "axios";

const ProfilePage = () => {
  //TODO - Decide how this page gets userId.
  const { userId } = useParams();
  const [user, setUser] = useState<IUser>({} as IUser);

  const currentUserId = localStorage.getItem("userId");
  const isOwnProfile = user._id === currentUserId;

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`${serverLink}/users/${userId}`);
      setUser(response.data);
    };
    fetchUser();
  }, []);

  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleOpenEditModal = () => setEditModalOpen(true);
  const handleCloseEditModal = () => setEditModalOpen(false);

  const ProfileContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(2),
    padding: theme.spacing(3),
  }));

  const ProfileDetails = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(1),
  }));

  const EditModal = styled(Modal)(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const CustomTextField = styled(TextField)(() => ({
    "& .MuiInputBase-root": {
      color: muiTheme.palette.text.secondary,
    },
  }));

  const ModalContent = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  }));

  const GamesGrid = styled(Grid)(({ theme }) => ({
    marginTop: theme.spacing(4),
    width: "100%",
  }));

  const calculateAge = (birthdate: Date) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  console.log("user", user);

  return (
    user && (
      <ProfileContainer>
        <Typography
          sx={{ color: muiTheme.palette.text.secondary }}
          variant="h4"
          component="h1"
          align="center"
        >
          {user.name}
        </Typography>
        <Avatar
          src={user.profileImage}
          alt={user.name}
          sx={{ width: 150, height: 150 }}
        />
        <ProfileDetails>
          <Typography
            sx={{ color: muiTheme.palette.text.secondary }}
            variant="body1"
          >
            Age: {calculateAge(user.birthDate)}
          </Typography>
          <Typography
            sx={{ color: muiTheme.palette.text.secondary }}
            variant="body1"
          >
            Birthdate: {new Date(user.birthDate).toDateString()}
          </Typography>
          <Typography
            sx={{ color: muiTheme.palette.text.secondary }}
            variant="body1"
          >
            Games Published: {user.gamesId?.length}
          </Typography>
          <Button
            sx={{ color: muiTheme.palette.text.secondary }}
            onClick={() => navigate("/myGames")}
            variant="contained"
            color="primary"
          >
            {isOwnProfile ? "My Games" : `${user.name}'s Games`}
          </Button>
          {isOwnProfile && (
            <Button
              sx={{ color: muiTheme.palette.text.secondary }}
              variant="contained"
              color="primary"
              onClick={handleOpenEditModal}
            >
              Edit Profile
            </Button>
          )}
        </ProfileDetails>

        <Typography
          sx={{ color: muiTheme.palette.text.secondary, marginTop: 2 }}
          variant="h5"
          component="h2"
          align="center"
        >
          {isOwnProfile
            ? "Your Most Viewed Games"
            : `${user.name}'s Most Viewed Games`}
        </Typography>

        <GamesGrid container spacing={2}>
          {user.gamesId?.map((game: IGame) => {
            console.log("Game:", game);
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={game._id}>
                <GameCard {...game} />
              </Grid>
            );
          })}
        </GamesGrid>

        <EditModal open={isEditModalOpen} onClose={handleCloseEditModal}>
          <ModalContent sx={{ backgroundColor: muiTheme.palette.primary.main }}>
            <Typography
              sx={{ color: muiTheme.palette.text.secondary }}
              variant="h6"
              component="h2"
            >
              Edit Profile
            </Typography>
            <CustomTextField label="Name" defaultValue={user.name} fullWidth />
            <CustomTextField
              label="Profile Image URL"
              defaultValue={user.profileImage}
              fullWidth
            />
            <CustomTextField
              label="Birthdate"
              type="date"
              defaultValue={new Date(user.birthDate)}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCloseEditModal}
              sx={{
                backgroundColor: muiTheme.palette.background.default,
                color: muiTheme.palette.secondary.main,
                "&:hover": {
                  backgroundColor: muiTheme.palette.text.hover, // Change to your desired hover background color
                },
              }}
            >
              Save
            </Button>
          </ModalContent>
        </EditModal>
      </ProfileContainer>
    )
  );
};

export default ProfilePage;
