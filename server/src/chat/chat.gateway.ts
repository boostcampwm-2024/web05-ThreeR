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
import { Cron, CronExpression } from '@nestjs/schedule';

const CLIENT_KEY_PREFIX = 'socket_client:';
const CHAT_HISTORY_KEY = 'chat:history';
const CHAT_HISTORY_LIMIT = 20;
const CHAT_MIDNIGHT_CLIENT_NAME = 'system';
const MAX_CLIENTS = 500;

type BroadcastPayload = {
  username: string;
  message: string;
  timestamp: Date;
};

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
  private dayInit: boolean = false;

  constructor(private readonly redisService: RedisService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  private midnightInitializer() {
    this.dayInit = true;
  }

  private async emitMidnightMessage() {
    const broadcastPayload: BroadcastPayload = {
      username: CHAT_MIDNIGHT_CLIENT_NAME,
      message: '',
      timestamp: new Date(),
    };

    await this.saveMessageToRedis(broadcastPayload);

    this.server.emit('message', broadcastPayload);
  }

  async handleConnection(client: Socket) {
    const userCount = this.server.engine.clientsCount;
    if (userCount > MAX_CLIENTS) {
      client.emit('maximum_exceeded', {
        message: '채팅 서버의 한계에 도달했습니다. 잠시후 재시도 해주세요.',
      });
      client.disconnect(true);
      return;
    }

    const ip = this.getIp(client);
    const clientName = await this.getOrSetClientNameByIp(ip);
    const recentMessages = await this.redisService.redisClient.lrange(
      CHAT_HISTORY_KEY,
      0,
      CHAT_HISTORY_LIMIT - 1,
    );
    const chatHistory = recentMessages.map((msg) => JSON.parse(msg)).reverse();

    client.emit('chatHistory', chatHistory);

    this.server.emit('updateUserCount', {
      userCount: userCount,
      name: clientName,
    });
  }

  handleDisconnect() {
    this.server.emit('updateUserCount', {
      userCount: this.server.engine.clientsCount,
    });
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: { message: string }) {
    const ip = this.getIp(client);
    const redisKey = CLIENT_KEY_PREFIX + ip;
    const clientName = await this.redisService.redisClient.get(redisKey);

    const broadcastPayload: BroadcastPayload = {
      username: clientName,
      message: payload.message,
      timestamp: new Date(),
    };

    await this.saveMessageToRedis(broadcastPayload);

    if (this.dayInit) {
      this.dayInit = false;
      await this.emitMidnightMessage();
    }

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
    let clientName: string = await this.redisService.redisClient.get(redisKey);

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

  private async saveMessageToRedis(payload: BroadcastPayload) {
    await this.redisService.redisClient.lpush(
      CHAT_HISTORY_KEY,
      JSON.stringify(payload),
    );

    await this.redisService.redisClient.ltrim(
      CHAT_HISTORY_KEY,
      0,
      CHAT_HISTORY_LIMIT - 1,
    );
  }
}
