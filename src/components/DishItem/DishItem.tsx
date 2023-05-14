import React from 'react';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface DishItemProps {
  title: string;
  shortDescription: string;
  image: string;
  price: number;
}

const DishItem: React.FC<DishItemProps> = ({ title, shortDescription, price, image: _image }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image="https://mui.com/static/images/cards/paella.jpg" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {shortDescription}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {price}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
        <Button size="small">Share</Button>
      </CardActions> */}
    </Card>
  );
};

export default DishItem;
