import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { OrderDetails } from '@/entitiesTypes';
import Divider from '@mui/material/Divider';

export const OrderSummary: React.FC<{ orderDetails: OrderDetails[] }> = ({ orderDetails }) => {
  const totalPrice = orderDetails.reduce((total, { quantity, menuItem }) => {
    return total + menuItem.price * quantity;
  }, 0);

  return (
    <Box sx={{ width: '50%', border: '1px solid black' }}>
      <Typography component="h4"> Order Summary</Typography>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography>Total</Typography>
          <Typography>$ {totalPrice.toFixed(2)}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography>Discount</Typography>
          <Typography>$0</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography>Including VAT(20%)</Typography>
          <Typography>$ {(totalPrice * 0.2).toFixed(2)}</Typography>
        </Stack>
        <Divider />
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography>Total Price</Typography>
          <Typography>$ {totalPrice.toFixed(2)}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};
