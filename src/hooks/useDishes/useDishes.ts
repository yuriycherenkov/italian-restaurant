import { get } from '@/servise/fetch';
import { useQuery } from 'react-query';

const getDishes = async () => get('/api/dishes');

const useDishes = () => {
  return useQuery({
    queryKey: ['get-dishes'],
    queryFn: () => getDishes(),
  });
};

export default useDishes;
