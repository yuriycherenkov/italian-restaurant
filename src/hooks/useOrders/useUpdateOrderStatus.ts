import { GET_CURRENT_ORDERS } from '@/constants/reactQueryKeys';
import { Order } from '@/entitiesTypes';
import { put } from '@/service/fetch';
import { OrderStatus } from '@prisma/client';
import { useMutation, useQueryClient } from 'react-query';

const updateOrderStatus = (id: string, status: OrderStatus) => put<Partial<Order>>(`/api/orders/${id}`, { status });

const useUpdateOrderStatus = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation((status: OrderStatus) => updateOrderStatus(id, status), {
    onMutate: async (status: OrderStatus) => {
      await queryClient.cancelQueries(GET_CURRENT_ORDERS);

      const previousOrders = queryClient.getQueryData<Order[]>(GET_CURRENT_ORDERS);

      queryClient.setQueryData<Order[] | undefined>(GET_CURRENT_ORDERS, (oldOrder) =>
        oldOrder?.map((order) => (order.id === id ? { ...order, status } : { ...order }))
      );

      return { previousOrders };
    },
    onError: (_err, _status, context) => {
      queryClient.setQueryData(GET_CURRENT_ORDERS, context?.previousOrders);
    },
    onSettled: () => {
      queryClient.invalidateQueries(GET_CURRENT_ORDERS);
    },
  });
};

export default useUpdateOrderStatus;
