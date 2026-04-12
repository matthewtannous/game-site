import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io';

@WebSocketGateway()
export class ChallengeGateway {
    @WebSocketServer()
    server: Server;

    emitChallengeCreated(challengeId: number, challenge: any) {
        this.server.emit('challengeCreated', { challengeId, challenge });
    }
    emitChallengeDeleted(challengeId: number) {
        this.server.emit('challengeDeleted', { challengeId });
    }
    emitChallengeUpdated(challengeId: number, challenge: any) {
        this.server.emit('challengeUpdated', { challengeId, challenge });
    }
}
