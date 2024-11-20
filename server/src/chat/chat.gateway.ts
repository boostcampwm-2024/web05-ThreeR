import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RedisService } from '../common/redis/redis.service';
import { Injectable } from '@nestjs/common';
import { getRandomNickname } from '@woowa-babble/random-nickname';

const CLIENT_KEY_PREFIX = 'socket_client:';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  constructor(private readonly redisService: RedisService) {}

  // 연결 시 처리
  async handleConnection(client: Socket) {
    const ip = this.getIp(client);

    const clientName = await this.getOrSetClientNameByIp(ip);

    this.server.emit('updateUserCount', {
      userCount: this.server.sockets.sockets.size,
      name: clientName,
    });
  }

  // 연결 해제 시 처리
  handleDisconnect() {
    this.server.emit('updateUserCount', {
      userCount: this.server.sockets.sockets.size,
    });
  }

  // 메시지 수신 시 처리
  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: { message: string }) {
    const ip = this.getIp(client);
    const redisKey = CLIENT_KEY_PREFIX + ip;
    const clientName = await this.redisService.redisClient.get(redisKey);

    const broadcastPayload = {
      username: clientName,
      message: payload.message,
      timestamp: new Date(),
    };
    this.server.emit('message', broadcastPayload);
  }

  private getIp(client: Socket) {
    const forwardedFor = client.handshake.headers['x-forwarded-for'] as string;
    const ip = forwardedFor
      ? forwardedFor.split(',')[0].trim()
      : client.handshake.address;

    return ip;
  }

  private async getOrSetClientNameByIp(ip: string) {
    const redisKey = CLIENT_KEY_PREFIX + ip;
    let clientName = await this.redisService.redisClient.get(redisKey);

    if (clientName) {
      return clientName;
    }

    clientName = this.generateRandomUsername();
    await this.redisService.redisClient.set(
      redisKey,
      clientName,
      'EX',
      3600 * 24,
    );
    return clientName;
  }

  private generateRandomUsername(): string {
    const type = 'animals';

    return getRandomNickname(type);
  }
}
