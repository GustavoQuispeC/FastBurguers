import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server,Socket} from "socket.io";

@WebSocketGateway({
    cors:{
        origin:'*'
    }
})
export class ChatsocketGateway implements OnGatewayConnection, OnGatewayDisconnect{

    @WebSocketServer()
    server:Server;
    
    afterInit(server: any) {
        console.log('Socket service funcionando')
    }

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`)
    }

    handleDisconnect(client: Socket) {
        `Client disconnected: ${client.id}`
    }

    @SubscribeMessage('mensaje')
    handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: any){
        console.log(data);
        client.broadcast.emit('mensaje', data);
    }
}