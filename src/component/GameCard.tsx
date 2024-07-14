import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import muiTheme from '../themes/muiTheme';

const GameCard = ({image, title, description, id}: {image: string, title:string, description:string, id:number}) => {

  const navigate = useNavigate();

  return (
    <Card key={id} sx={{ maxWidth: 345, display:'flex', flexDirection:'column', backgroundColor:muiTheme.palette.background.default}}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title={title}
      />
      <CardContent sx = {{flex:1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography sx={{color:muiTheme.palette.text.title}} gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{color:muiTheme.palette.text.description}} variant="body2" color="text.secondary">
        {description}
        </Typography>
      </CardContent>
      <CardActions sx = {{justifyContent:'space-between'}}>
        <Button sx={{color:muiTheme.palette.text.button}} size="small" onClick={() => navigate("/game")}>Game Page</Button>
        <Button sx={{color:muiTheme.palette.text.button}} size="small" onClick={() => navigate("/profile")}>Developer Page</Button>
      </CardActions>
    </Card>
  );
}

export default GameCard;
