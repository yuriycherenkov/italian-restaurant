import React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { OrderStatusStepper } from './OrderStatusStepper';
import { useSocket } from '@/hooks/useSocket';
import { OrderDetailsCustomer } from './OrderDetailsCustomer';
import { OrderSummary } from './OrderSummary';

const OrderConfirmation: React.FC<any> = (props) => {
  const { id, orderDetails, status } = props;
  const socket = useSocket();
  const [activeStatus, setStatus] = React.useState(status);
  const isCompleted = activeStatus === 'PICKED';

  React.useEffect(() => {
    if (socket) {
      socket.on('statusUpdated', (status) => {
        setStatus(status);
      });
    }
  }, [socket]);

  return (
    <Paper sx={{ py: 3, px: 2 }}>
      <Stack>
        <Stack direction="row" alignItems="center" justifyContent="center" flexWrap="wrap" sx={{ mb: 2 }}>
          <CheckCircleOutlineIcon color="success" fontSize="large" sx={{ mr: 1 }} />
          <Typography component="h1" variant="h4">
            Order Confirmation
          </Typography>
        </Stack>
        <Typography component="h2" variant="h5" sx={{ mb: 3 }}>
          Order #{id}
        </Typography>
        {!isCompleted && <OrderStatusStepper status={activeStatus} />}
        <Typography>
          Thank you for placing your order with Tratoria Italiano. We have received your order and it is currently being
          processed. Please find the details of your order below:
        </Typography>
        <OrderDetailsCustomer orderDetails={orderDetails} />
        <OrderSummary orderDetails={orderDetails} />
        {isCompleted && <Chip label="Completed" variant="outlined" color="primary" />}
      </Stack>
    </Paper>
  );
};

export default OrderConfirmation;
