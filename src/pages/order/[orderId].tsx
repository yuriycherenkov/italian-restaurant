import { useMyOrder } from '@/hooks/useOrders';
import { useSocket } from '@/hooks/useSocket';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function MyOrder() {
  const { query } = useRouter();
  const socket = useSocket();

  const orderId = query.orderId as string;

  useEffect(() => {
    if (socket) {
      socket.on('statusUpdated', (status) => {
        console.log('new status: ', status);
      });
    }
  }, [socket]);

  const { data: myOrderData } = useMyOrder(orderId);

  if (!myOrderData) return 'Oops';

  return (
    <Stack>
      <h3>{orderId}</h3>
      <p>{myOrderData.status}</p>
    </Stack>
  );
}
