import * as React from 'react';
import Masonry from '@mui/lab/Masonry';
import OrderCard from '@/components/OrderCard/OrderCard';
import Grid from '@mui/material/Grid';
import { useOrders } from '@/hooks/useOrders';

export default function BasicMasonry() {
  const { data: orders } = useOrders();
  if (!orders) return 'Loading...';

  if (!orders.length) return 'No orders';

  return (
    <Grid container spacing={2}>
      <Masonry columns={3} spacing={2}>
        {orders.map((order, index) => (
          <OrderCard key={index} {...order} />
        ))}
      </Masonry>
    </Grid>
  );
}
