import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCartContext } from '@/context/CartContext';
import { MenuItem } from '@/entitiesTypes';

const DishItem: React.FC<MenuItem> = (details) => {
  const {
    dish: { title, image },
    price,
  } = details;
  const { addToCart } = useCartContext();

  const handleAddToCardClick = () => {
    addToCart(details);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={image} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 18, fontWeight: 600 }}>
          {price} $
        </Typography>
        <Button size="small" onClick={handleAddToCardClick}>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default DishItem;
