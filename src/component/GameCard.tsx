import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const GameCard = () => {

  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1151640/header.jpg?t=1717621265"
        title="Horizon Zero Dawn"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Horizon Zero Dawn
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Experience Aloy’s legendary quest to unravel the mysteries of a future Earth ruled by Machines.
        Use devastating tactical attacks against your prey and explore a majestic open world in this award-winning action RPG!
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate("/game")}>Game Page</Button>
        <Button size="small" onClick={() => navigate("/profile")}>Developer Page</Button>
      </CardActions>
    </Card>
  );
}

export default GameCard;
