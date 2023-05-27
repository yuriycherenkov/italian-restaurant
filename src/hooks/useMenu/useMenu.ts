import { GET_MENU } from '@/constants/reactQueryKeys';
import { Category } from '@/entitiesTypes';
import { get } from '@/service/fetch';
import { useQuery } from 'react-query';

const getMenu = async () => get<Category[]>('/api/menu');

const useMenu = () => {
  return useQuery({
    queryKey: [GET_MENU],
    queryFn: () => getMenu(),
  });
};

export default useMenu;
