import { useEffect, useState } from "react";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/system";
import muiTheme from "../../themes/muiTheme";
import { useNavigate, useParams } from "react-router-dom";
import { IUser } from "../../utils/types/types.ts";
import { serverLink } from "../../utils/constants/serverLink.ts";
import axios from "axios";
import { socialNetworksLogoMap } from "../../utils/constants/platformsSupport.ts";
import EditUserModal from "../../components/EditProfileModal.tsx";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState<IUser>({} as IUser);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const currentUserId = localStorage.getItem("userId");
  const isOwnProfile = user._id === currentUserId;

  const fetchUser = async () => {
    const response = await axios.get(`${serverLink}/users/${userId}`);
    setUser(response.data);
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const handleOpenEditModal = () => setEditModalOpen(true);
  const handleCloseEditModal = () => {
    fetchUser();
    setEditModalOpen(false);
  };

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
          src={serverLink + "/" + user.profileImage}
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
          <Box sx={{ display: "flex", gap: 1, marginTop: 1 }}>
            {user?.socialNetworks?.map((socialNetwork) => (
              <IconButton
                key={socialNetwork.platform}
                onClick={() => window.open(socialNetwork.url, "_blank")}
              >
                <img
                  src={socialNetworksLogoMap.get(socialNetwork.platform)}
                  alt={socialNetwork.platform}
                  style={{ width: 32, height: 32 }}
                />
              </IconButton>
            ))}
          </Box>
          <Button
            sx={{
              backgroundColor: muiTheme.palette.background.default,
              color: muiTheme.palette.text.secondary,
              "&:hover": {
                backgroundColor: muiTheme.palette.text.hover,
              },
            }}
            onClick={() => navigate(`/myGames/${userId}`)}
            variant="contained"
            color="primary"
          >
            {isOwnProfile ? "My Games" : `${user.name}'s Games`}
          </Button>
          {isOwnProfile && (
            <Button
              sx={{
                backgroundColor: muiTheme.palette.background.default,
                color: muiTheme.palette.text.secondary,
                "&:hover": {
                  backgroundColor: muiTheme.palette.text.hover,
                },
              }}
              variant="contained"
              color="primary"
              onClick={handleOpenEditModal}
            >
              Edit Profile
            </Button>
          )}
        </ProfileDetails>
        <EditUserModal
          open={isEditModalOpen}
          onClose={handleCloseEditModal}
          user={user}
        />
      </ProfileContainer>
    )
  );
};

export default ProfilePage;
