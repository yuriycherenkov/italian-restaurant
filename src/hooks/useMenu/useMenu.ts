import { MenuItem } from '@/entitiesTypes';
import { get } from '@/servise/fetch';
import { useQuery } from 'react-query';

const getMenu = async () => get<MenuItem[]>('/api/menu');

const useMenu = () => {
  return useQuery({
    queryKey: ['get-Menu'],
    queryFn: () => getMenu(),
  });
};

export default useMenu;
