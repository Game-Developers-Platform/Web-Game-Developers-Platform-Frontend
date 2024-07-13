import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const GameCard = ({image, title, description, id}: {image: string, title:string, description:string, id:number}) => {

  const [gameImage, setGameImage] = useState(image);
  const [gameTitle, setGameTitle] = useState(title);
  const [gameDescription, setGameDescription] = useState(description);

  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={gameImage}
        title={gameTitle}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {gameTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {gameDescription}
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
