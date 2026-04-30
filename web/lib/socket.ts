import { io } from 'socket.io-client';

/**
 * Instance Socket.IO connectée au serveur NestJS.
 * Utilise NEXT_PUBLIC_API_URL en production (Vercel)
 * et fallback sur localhost en développement.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const socket = io(API_URL, {
  transports: ['polling', 'websocket'],   // Important pour le déploiement
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 20000,
  autoConnect: true,
});

export default socket;