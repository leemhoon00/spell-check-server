import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Socket, Namespace } from 'socket.io';
import { MatchService } from 'src/match/match.service';

@WebSocketGateway({ namespace: /.+/, cors: { origin: '*' } })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private matchService: MatchService) {}

  @WebSocketServer()
  io: Namespace;

  @SubscribeMessage('test')
  handleTest(@MessageBody() data: string) {
    console.log('test', data);
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    const matchId = client.nsp.name.split('/')[1];
    const match = await this.matchService.getMatchById(matchId);
    if (!match) {
      client.disconnect();
    }
    client.emit('match', match);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('disconnect');
    if (this.getNspClientsNumber(client.nsp.name) === 0) {
      console.log('0명');
      setTimeout(() => {
        if (this.getNspClientsNumber(client.nsp.name) === 0) {
          console.log('10초 뒤 0명');
          this.matchService.removeMatchById(client.nsp.name.split('/')[1]);
        }
      }, 10000);
    }
  }

  getNspClientsNumber(nsp: string) {
    return this.io.server.of(nsp).sockets.size;
  }
}
