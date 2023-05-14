import { get } from '@/servise/fetch';
import { useQuery } from 'react-query';

const geMenu = async () => get('/api/menu');

const useMenu = () => {
  return useQuery({
    queryKey: ['get-Menu'],
    queryFn: () => geMenu(),
  });
};

export default useMenu;
