import { GET_ORDERS } from '@/constants/reactQueryKeys';
import { Order } from '@/entitiesTypes';
import { get } from '@/service/fetch';
import { useQuery } from 'react-query';

const getOrderById = (id: string) => get<Order>(`/api/orders/${id}`);

const useMyOrder = (id: string) => {
  return useQuery({
    queryKey: [GET_ORDERS, id],
    queryFn: () => getOrderById(id),
    enabled: Boolean(id),
  });
};

export default useMyOrder;
