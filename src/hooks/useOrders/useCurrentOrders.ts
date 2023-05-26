import { GET_CURRENT_ORDERS } from '@/constants/reactQueryKeys';
import { Order } from '@/entitiesTypes';
import { get } from '@/service/fetch';
import { useQuery } from 'react-query';

const getCurrentOrders = () => get<Order[]>('/api/orders/current');

const useCurrentOrders = () => {
  return useQuery({
    queryKey: [GET_CURRENT_ORDERS],
    queryFn: () => getCurrentOrders(),
  });
};

export default useCurrentOrders;
