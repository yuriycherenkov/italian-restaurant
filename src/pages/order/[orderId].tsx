import { useMyOrder } from '@/hooks/useOrders';
import { useSocket } from '@/hooks/useSocket';
import { useRouter } from 'next/router';
import OrderConfirmation from '@/components/OrderConfirmation/OrderConfirmation';

export default function MyOrder() {
  const { query } = useRouter();
  useSocket();

  const orderId = query.orderId as string;
  const { data: myOrderData } = useMyOrder(orderId);

  if (!myOrderData) return 'Oops';

  return <OrderConfirmation {...myOrderData} />;
}
