import { io } from 'socket.io-client';

export const socketInitialize = async () => {
  await fetch('/api/socket');

  const socket = io();

  socket.on('connect', () => {
    console.log('connected');
  });

  return socket;
};
