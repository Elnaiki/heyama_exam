import { io } from 'socket.io-client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const socket = io(API_URL, {
  transports: ['polling', 'websocket'],
  reconnection: true,
});

export default socket;