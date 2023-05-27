import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCartContext } from '@/context/CartContext';
import { MenuItem } from '@/entitiesTypes';
import { styled } from '@mui/material/styles';

const FlipCardContainer = styled(Card)({
  perspective: 1000,
  height: 200,
  cursor: 'pointer',
  position: 'relative',
  '&:hover': {
    '& .flip-card-front': {
      filter: 'blur(2px)',
    },
    '& .flip-hover-content': {
      opacity: 1,
    },
  },
});

const FlipCardInner = styled('div')(({ flipped }: { flipped: boolean }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  textAlign: 'center',
  transition: 'transform 0.5s',
  transformStyle: 'preserve-3d',
  transform: flipped ? 'rotateY(180deg)' : 'none',
}));

const FlipCardFront = styled(CardMedia)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  WebkitBackfaceVisibility: 'hidden', // Safari
  backfaceVisibility: 'hidden',
});

const FlipCardBack = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  WebkitBackfaceVisibility: 'hidden', // Safari
  backfaceVisibility: 'hidden',
  backgroundColor: '#fff',
  color: '#000',
  transform: 'rotateY(180deg)',
});

const HoverContent = styled('div')(({ flipped }: { flipped: boolean }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  opacity: 0,
  display: flipped ? 'none' : 'block',
  transition: 'opacity 0.5s',
  zIndex: '1',
  fontSize: 20,
  padding: 10,
}));

const DishItem: React.FC<MenuItem> = (details) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const {
    dish: { title, image, description, kcal },
    price,
  } = details;
  const { addToCart } = useCartContext();

  const handleAddToCardClick = () => {
    addToCart(details);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <FlipCardContainer onClick={handleFlip}>
        <HoverContent flipped={isFlipped} className="flip-hover-content">
          Click to find more details
        </HoverContent>
        <FlipCardInner flipped={isFlipped}>
          <FlipCardFront image={image} className="flip-card-front" />
          <FlipCardBack>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Ingredients:
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {description}
              </Typography>
              <Typography variant="body1">
                <b>kcal</b> {kcal}
              </Typography>
            </CardContent>
          </FlipCardBack>
        </FlipCardInner>
      </FlipCardContainer>
      <CardContent sx={{ minHeight: 105 }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
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
