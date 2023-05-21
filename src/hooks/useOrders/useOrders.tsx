import { GET_ORDERS } from '@/constants/reactQueryKeys';
import { Order } from '@/entitiesTypes';
import { get } from '@/service/fetch';
import { useQuery } from 'react-query';

const getOrders = () => get<Order[]>('/api/orders');

const useOrders = () => {
  return useQuery({
    queryKey: [GET_ORDERS],
    queryFn: () => getOrders(),
  });
};

export default useOrders;
