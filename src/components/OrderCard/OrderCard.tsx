import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Order } from '@/entitiesTypes';
import { OrderStatus } from '@prisma/client';
import { useUpdateOrderStatus } from '@/hooks/useOrders';
import { OrderDetailsList } from './OrderDetails';

const STATUSES: OrderStatus[] = ['PENDING', 'PROCESSING', 'READY', 'PICKED'];

const OrderCard: React.FC<Order> = (props) => {
  const { id, status: activeStatus, orderDetails } = props;
  const { mutate: updateOrderStatus } = useUpdateOrderStatus(id);

  const updateStatus = (status: OrderStatus) => {
    updateOrderStatus(status);
  };

  return (
    <Card sx={{ maxWidth: 385 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Order #{id}
        </Typography>
        <OrderDetailsList orderDetails={orderDetails} />
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <ButtonGroup color="secondary" aria-label="order status">
          {STATUSES.map((status) => (
            <Button
              key={status}
              color={status === activeStatus ? 'primary' : 'secondary'}
              variant={status === activeStatus ? 'contained' : 'outlined'}
              onClick={() => updateStatus(status)}
            >
              {status}
            </Button>
          ))}
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default OrderCard;
