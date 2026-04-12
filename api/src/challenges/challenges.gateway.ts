import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class ChallengeGateway {
  @WebSocketServer()
  server: Server;

  emitChallengeUpdate(challengeId: number, challenge: any) {
    this.server.emit('challengeUpdated', { challengeId, challenge });
  }
}
