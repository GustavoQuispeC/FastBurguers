import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ namespace: '/admin' })
export class AdminGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AdminGateway');

  afterInit(server: Server) {
    this.logger.log('Admin namespace initialized');
  }
}
