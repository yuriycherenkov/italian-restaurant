import { GET_ORDERS } from '@/constants/reactQueryKeys';
import { Order } from '@/entitiesTypes';
import { get } from '@/service/fetch';
import { useQuery } from 'react-query';
import { TokenStatus } from '@prisma/client';

export interface useTokensProps {
  status: keyof typeof TokenStatus;
  enabled: boolean;
}

const getATokensByStatus = (status: keyof typeof TokenStatus) => get<Order>(`/api/tokens?status=${status}`);

const useTokens = ({ status, enabled }: useTokensProps) => {
  return useQuery({
    enabled,
    queryKey: [GET_ORDERS, status],
    queryFn: () => getATokensByStatus(status),
  });
};

export default useTokens;
