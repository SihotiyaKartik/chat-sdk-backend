import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from './message.service';
import { MessageSender } from 'src/entity/message.entity';
import { createMessageDto } from './dto/create.message';
import { GqlContextInterface } from 'src/gql.context';
import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly messageService: MessageService,
    private readonly authService: AuthService,
  ) {}

  @WebSocketServer() server: Server;

  afterInit(server: any) {
    console.log('Connection initialized');
  }

  async handleConnection(socket: Socket, message: any) {
    try {
      const token = Array.isArray(socket?.handshake?.query?.token)
        ? socket?.handshake?.query?.token[0]
        : socket?.handshake?.query?.token;

      const context: GqlContextInterface =
        await this.authService.authenticateMessageToken(token);

      socket.data.context = context;
    } catch (error) {
      socket.disconnect;
      throw new Error(error);
    }
  }

  handleDisconnect(socket: Socket) {
    console.log('Disconnect');
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(socket: Socket, message: any) {
    this.server.emit('recievedMessage', message);

    const { text, sender } = message;
    const { merchantId, userId } = socket.data.context;

    const messageSender =
      sender === 'User' ? MessageSender.User : MessageSender.Merchant;

    const newMessage = new createMessageDto();

    newMessage.text = text;
    newMessage.userId = userId;
    newMessage.merchantId = merchantId;
    newMessage.sender = messageSender;

    await this.messageService.createMessage(newMessage);
  }
}
