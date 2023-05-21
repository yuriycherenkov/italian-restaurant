import { type Socket } from 'socket.io-client';
import { socketInitialize } from '@/service/socket';
import { useEffect } from 'react';

let socket: Socket | null = null;

const useSocket = () => {
  const init = async () => {
    if (!socket) {
      socket = await socketInitialize();
    }
  };
  useEffect(() => {
    init();
    return () => {
      socket && socket.disconnect();
      socket = null;
    };
  }, []);

  return socket;
};

export default useSocket;
