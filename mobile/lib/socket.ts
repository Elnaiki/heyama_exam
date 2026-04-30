import { io } from 'socket.io-client';

/**
 * Instance Socket.IO connectée au serveur NestJS.
 * Cette instance est partagée dans toute l'application web
 * pour recevoir les événements en temps réel.
 */
const socket = io('http://localhost:3000');

export default socket;