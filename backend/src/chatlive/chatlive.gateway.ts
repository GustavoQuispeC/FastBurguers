import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3002, {
  cors: {
    origin: '*',
  },
})
export class ChatsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    console.log('Socket service funcionando en puerto 3002');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join')
  handleJoinRoom(client: Socket, room: string): void {
    client.join(room);
    this.logger.log(`Client ${client.id} joined room ${room}`);
    this.server.of('/admin').emit('new_room', room);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, data: { room: string; message: string }): void {
    const { room, message } = data;
    this.server.to(room).emit('message', message);
  }
}
