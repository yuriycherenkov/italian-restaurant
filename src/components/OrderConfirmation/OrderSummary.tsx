import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { OrderDetails } from '@/entitiesTypes';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';

export const OrderSummary: React.FC<{ orderDetails?: OrderDetails[] }> = ({ orderDetails = [] }) => {
  const totalPrice = orderDetails.reduce((total, { quantity, menuItem }) => {
    return total + menuItem.price * quantity;
  }, 0);

  return (
    <Paper
      sx={{
        width: ['100%', '100%', '50%'],
        mb: 3,
        ml: 'auto',
        p: 2,
      }}
    >
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
    </Paper>
  );
};
