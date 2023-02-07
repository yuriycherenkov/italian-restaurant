import axios from 'axios';

const TestComponent = () => {
  // const { data, error, isLoading } = useGetUser();
  const createUserRes = async () => await axios.post('/api/hello', {});

  // if(isLoading) return <p>loading...</p>;
  // if(error) return <p>something went wrong</p>;
  
  return <div>
    {/* hello <span>{data?.name}</span> */}
    <button type="button" onClick={createUserRes}>click me!</button>
    Hello world
  </div>
} 

export default TestComponent;