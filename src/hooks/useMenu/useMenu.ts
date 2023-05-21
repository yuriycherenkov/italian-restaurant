import { GET_MENU } from '@/constants/reactQueryKeys';
import { MenuItem } from '@/entitiesTypes';
import { get } from '@/service/fetch';
import { useQuery } from 'react-query';

const getMenu = async () => get<MenuItem[]>('/api/menu');

const useMenu = () => {
  return useQuery({
    queryKey: [GET_MENU],
    queryFn: () => getMenu(),
  });
};

export default useMenu;
