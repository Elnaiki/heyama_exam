import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

/**
 * Gateway Socket.IO pour la communication en temps réel.
 * Notifie tous les clients connectés lors de créations et suppressions.
 */
@WebSocketGateway({ cors: { origin: '*' } })
export class ObjectsGateway {
  @WebSocketServer()
  server: Server;

  /** Notifie tous les clients qu'un nouvel objet a été créé */
  notifyNewObject(object: unknown) {
    this.server.emit('newObject', object);
  }

  /** Notifie tous les clients qu'un objet a été supprimé */
  notifyDeleteObject(id: string) {
    this.server.emit('deletedObject', id);
  }
}