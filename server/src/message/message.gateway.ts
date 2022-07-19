import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  IAnswer,
  ICandidate,
  IOffer,
  IRequest,
  IResponse,
  IRTCDefaultData,
} from 'src/types/rtc';
import { UserService } from 'src/user/user.service';
import generateDate from 'src/utils/date';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  constructor(private userService: UserService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('messageToServer')
  handleMessage(client: Socket, payload: any): void {
    client.emit('messageToClient', payload);
    this.server.to(payload.to).emit('messageToClient', payload);
  }

  @SubscribeMessage('joinPrivateRoom')
  async handleChangeId(client: Socket, id: string): Promise<void> {
    client.join(id);
    await this.userService.setUserStatusFromDB(id, 'online');
    this.server.emit('getUserStatus', { id });
  }

  @SubscribeMessage('leavePrivateRoom')
  async handleLeaveChat(client: Socket, id: string): Promise<void> {
    client.leave(id);
    console.log(id, 'left');
    const lastOnline = generateDate();
    await this.userService.setUserStatusFromDB(id, lastOnline);
    this.server.emit('getUserStatus', { id });
  }

  @SubscribeMessage('callRequestToServer')
  handleCallRequest(client: Socket, payload: IRequest): void {
    this.server.to(payload.to.toString()).emit('callRequestToClient', payload);
  }

  @SubscribeMessage('callResponseToServer')
  handleCallResponse(client: Socket, payload: IResponse): void {
    this.server.to(payload.to.toString()).emit('callResponseToClient', payload);
  }

  @SubscribeMessage('discardCallFromCallerToServer')
  handleDiscardFromCaller(client: Socket, payload: IRTCDefaultData): void {
    this.server
      .to(payload.to.toString())
      .emit('discardCallFromCallerToServer', payload);
  }

  @SubscribeMessage('joinRTCRoomToServer')
  handleOffer(client: Socket, payload: IOffer): void {
    this.server.to(payload.to.toString()).emit('joinRTCRoomToClient', payload);
  }

  @SubscribeMessage('answerRTCToServer')
  handleAnswer(client: Socket, payload: IAnswer): void {
    this.server.to(payload.to.toString()).emit('answerRTCToClient', payload);
  }

  @SubscribeMessage('candidateRTCToServer')
  handleCandidate(client: Socket, payload: ICandidate): void {
    this.server.to(payload.to.toString()).emit('candidateRTCToClient', payload);
  }

  @SubscribeMessage('disconnectRTCToServer')
  handleRTCDisconnect(client: Socket, payload: any): void {
    this.server.to(payload.to.toString()).emit('disconnectRTCToClient');
  }

  @SubscribeMessage('isTypingToServer')
  handleisTyping(client: Socket, payload: any): void {
    this.server.to(payload.to).emit('isTypingToClient', payload);
  }

  @SubscribeMessage('viewedMessageToServer')
  handleisView(client: Socket, payload: any): void {
    client.emit('viewedMessageToClient', payload);
    this.server
      .to(payload.from.toString())
      .emit('viewedMessageToClient', payload);
  }
}
