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
import { escape } from 'html-escaper';

const CLIENT_KEY_PREFIX = 'socket_client:';
const CHAT_HISTORY_KEY = 'chat:history';
const CHAT_HISTORY_LIMIT = 20;

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*', // TODO: 연동 할때 보고 확인 후 설정 해보기
  },
  path: '/chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  constructor(private readonly redisService: RedisService) {}

  async handleConnection(client: Socket) {
    const ip = this.getIp(client);
    const clientName = await this.getOrSetClientNameByIp(ip);
    const recentMessages = await this.redisService.redisClient.lrange(
      CHAT_HISTORY_KEY,
      0,
      CHAT_HISTORY_LIMIT - 1,
    );
    const chatHistory = recentMessages.map((msg) => JSON.parse(msg));

    client.emit('chatHistory', chatHistory);

    this.server.emit('updateUserCount', {
      userCount: this.server.sockets.sockets.size,
      name: clientName,
    });
  }

  handleDisconnect() {
    this.server.emit('updateUserCount', {
      userCount: this.server.sockets.sockets.size,
    });
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: { message: string }) {
    const ip = this.getIp(client);
    const redisKey = CLIENT_KEY_PREFIX + ip;
    const clientName = await this.redisService.redisClient.get(redisKey);
    const chatMessage = escape(payload.message);

    const broadcastPayload = {
      username: clientName,
      message: chatMessage,
      timestamp: new Date(),
    };
    this.server.emit('message', broadcastPayload);

    await this.redisService.redisClient.lpush(
      CHAT_HISTORY_KEY,
      JSON.stringify(broadcastPayload),
    );

    await this.redisService.redisClient.ltrim(
      CHAT_HISTORY_KEY,
      0,
      CHAT_HISTORY_LIMIT - 1,
    );
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
