import { useState } from "react";
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

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  profileImage: string;
  socialNetworks: { platform: string; url: string }[];
  gamesId: string[];
  birthDate: Date;
  views: number;
  refreshTokens: string[];
}

export interface IGame {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  developerId: string;
  platformLinks: { platform: string; url: string }[];
  releaseDate: Date;
  views: number;
  categories: string[];
}

const currentUser: IUser = {
  id: "1",
  name: "Lior Hassin",
  email: "liorhassin3@gmail.com",
  password: "",
  profileImage: "https://avatar.iran.liara.run/public/22",
  birthDate: new Date("1994-01-01"),
  gamesId: ["1", "2"],
  views: 0,
  refreshTokens: [],
  socialNetworks: [],
};

const games: IGame[] = [
  {
    id: "1",
    name: "Horizon Zero Dawn",
    price: 59.99,
    image:
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1151640/header.jpg?t=1717621265",
    description:
      "Experience Aloy’s legendary quest to unravel the mysteries of a future Earth ruled by Machines. Use devastating tactical attacks against your prey and explore a majestic open world in this award-winning action RPG!",
    developerId: "1",
    platformLinks: [],
    releaseDate: new Date("2017-02-28"),
    views: 500,
    categories: [],
  },
  {
    id: "2",
    name: "Chained Together",
    price: 29.99,
    image:
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2567870/header.jpg?t=1719621610",
    description:
      "From the depths of hell, climb chained to your friends through diverse worlds. Solo or co-op, try to reach the summit and discover what awaits you there...",
    developerId: "1",
    platformLinks: [],
    releaseDate: new Date("2022-01-01"),
    views: 1000,
    categories: [],
  },
];

const ProfilePage = ({ user }: { user: IUser }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const isOwnProfile = currentUser.id === user.id;

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

  const userGames = games.filter((game) => user.gamesId.includes(game.id));
  const sortedGames = [...userGames].sort((a, b) => b.views - a.views);

  return (
    <ProfileContainer>
      <Typography variant="h4" component="h1" align="center">
        {user.name}
      </Typography>
      <Avatar
        src={user.profileImage}
        alt={user.name}
        sx={{ width: 150, height: 150 }}
      />
      <ProfileDetails>
        <Typography variant="body1">
          Age: {calculateAge(user.birthDate)}
        </Typography>
        <Typography variant="body1">
          Birthdate: {user.birthDate.toDateString()}
        </Typography>
        <Typography variant="body1">
          Games Published: {user.gamesId.length}
        </Typography>
        <Button variant="contained" color="primary">
          {isOwnProfile ? "My Games" : `${user.name}'s Games`}
        </Button>
        {isOwnProfile && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleOpenEditModal}
          >
            Edit Profile
          </Button>
        )}
      </ProfileDetails>

      <GamesGrid container spacing={2}>
        {sortedGames.map((game) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={game.id}>
            <GameCard {...game} />
          </Grid>
        ))}
      </GamesGrid>

      <EditModal open={isEditModalOpen} onClose={handleCloseEditModal}>
        <ModalContent>
          <Typography variant="h6" component="h2">
            Edit Profile
          </Typography>
          <TextField label="Name" defaultValue={user.name} fullWidth />
          <TextField
            label="Profile Image URL"
            defaultValue={user.profileImage}
            fullWidth
          />
          <TextField
            label="Birthdate"
            type="date"
            defaultValue={user.birthDate.toISOString().split("T")[0]}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseEditModal}
          >
            Save
          </Button>
        </ModalContent>
      </EditModal>
    </ProfileContainer>
  );
};

// Usage example
const App = () => {
  const user: IUser = currentUser;

  return <ProfilePage user={user} />;
};

export default App;
