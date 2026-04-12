import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class GamesGateway {
  @WebSocketServer()
  server: Server;

  emitGameUpdate(gameId: number, game: any) {
    this.server.emit('gameUpdated', { gameId, game });
  }
}
