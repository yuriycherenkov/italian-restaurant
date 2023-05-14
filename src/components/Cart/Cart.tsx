import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import { useCartContext } from '@/context/CartContext';
import Image from 'next/image';

const Cart: React.FC = () => {
  const { cart, addToCart, removeFromCart, decreaseQuantity } = useCartContext();

  return (
    <Box sx={{ width: 500 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Current Order</Typography>
        <Button>Clear all</Button>
      </Stack>
      {cart.map(({ item, quantity }) => (
        <Stack direction="row" alignItems="center" key={item.id}>
          <Image src={item.dish.image || 'todo'} height={50} alt="" />
          <Typography variant="body1">{item.dish.title}</Typography>

          <IconButton
            onClick={() => {
              decreaseQuantity(item.id);
            }}
          >
            <RemoveIcon fontSize="inherit" />
          </IconButton>
          <p>{item.dish.title}</p>
          <span>{quantity}</span>
          <IconButton
            onClick={() => {
              addToCart(item);
            }}
          >
            <AddIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            onClick={() => {
              removeFromCart(item.id);
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ))}
    </Box>
  );
};

export default Cart;
