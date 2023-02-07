import useSWR from 'swr'
import { Data } from './api/hello';
import { fetcher } from './utils';

const useGetUser = () => useSWR<Data>('/api/hello', fetcher)

const TestComponent = () => {
  const { data, error, isLoading } = useGetUser();

  if(isLoading) return <p>loading...</p>;
  if(error) return <p>something went wrong</p>;
  
  return <div>
    hello <span>{data?.name}</span>
  </div>
} 

export default TestComponent;