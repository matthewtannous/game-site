import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Game } from './entities/game.entity';

@WebSocketGateway()
export class GamesGateway {
  @WebSocketServer()
  server!: Server;

  emitGameUpdate(gameId: number, game: Game) {
    this.server.emit('gameUpdated', { gameId, game });
  }
}
