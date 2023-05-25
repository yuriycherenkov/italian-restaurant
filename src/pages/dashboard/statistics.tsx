import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useOrders } from '@/hooks/useOrders';
import StatisticsTable from '@/components/Statistics/StatisticsTable';

export default function Statistics() {
  const { data: orders } = useOrders();
  if (!orders) return 'Loading...';

  if (!orders.length) return 'No orders';

  return (
    <Paper sx={{ mt: 2, p: 2 }}>
      <Typography component="h1" variant="h5">
        Statistics of orders
      </Typography>
      <StatisticsTable orders={orders} />
    </Paper>
  );
}
