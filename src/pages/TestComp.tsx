import axios from 'axios';
import { useEffect } from 'react';

const TestComponent = () => {
  const createUserRes = async () => await axios.post('/api/hello', {});

  useEffect(() => {
    axios.get('/api/hello').then(({ data }) => {
      console.log('res => ', data);
    });
  }, []);

  return (
    <div>
      {/* hello <span>{data?.name}</span> */}
      <button type="button" onClick={createUserRes}>
        click me!
      </button>
    </div>
  );
};

export default TestComponent;
