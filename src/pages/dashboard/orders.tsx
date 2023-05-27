import * as React from 'react';
import Masonry from '@mui/lab/Masonry';
import OrderCard from '@/components/OrderCard/OrderCard';
import Grid from '@mui/material/Grid';
import useCurrentOrders from '@/hooks/useOrders/useCurrentOrders';

export default function Orders() {
  const { data: orders, isLoading } = useCurrentOrders();

  if (isLoading) return 'Loading...';
  if (!orders?.length) return 'No orders';

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
