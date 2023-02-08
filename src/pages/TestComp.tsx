import axios from 'axios';

const TestComponent = () => {
  const createUserRes = async () => await axios.post('/api/hello', {});
  
  return <div>
    {/* hello <span>{data?.name}</span> */}
    <button type="button" onClick={createUserRes}>click me!</button>
    Hello world
  </div>
} 

export default TestComponent;