import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RedisService } from '../common/redis/redis.service';

const CLIENT_KEY_PREFIX = 'socket_client:';

@WebSocketGateway({
  cors: {
    origin: '*', // 실제 서비스 시에는 도메인을 명시적으로 설정하는 것이 좋습니다.
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  private readonly redisService: RedisService;
  private clients: Map<string, number> = new Map();

  // 연결 시 처리
  async handleConnection(client: Socket) {
    const ip = this.getIp(client);

    const clientData = await this.getOrSetClientData(ip);

    this.server.emit('updateUserCount', {
      userCount: this.server.sockets.sockets.size,
      name: clientData.name,
      profile: clientData.profile,
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

    const clientInfoJson = await this.redisService.redisClient.get(redisKey);
    const clientInfo = JSON.parse(clientInfoJson);

    if (clientInfo) {
      const broadcastPayload = {
        username: clientInfo.name,
        profile: clientInfo.profile,
        message: payload.message,
        timestamp: new Date(),
      };
      this.server.emit('message', broadcastPayload);
    }
  }

  private getIp(client: Socket) {
    const forwardedFor = client.handshake.headers['x-forwarded-for'] as string;
    const ip = forwardedFor
      ? forwardedFor.split(',')[0].trim()
      : client.handshake.address;

    return ip;
  }
  private async getOrSetClientData(ip: string) {
    const redisKey = CLIENT_KEY_PREFIX + ip;
    const socketClient = await this.redisService.redisClient.get(redisKey);

    if (socketClient) {
      return JSON.parse(socketClient);
    }

    const clientData = {
      name: this.generateRandomUsername(),
      profile: this.generateRandomProfile(),
    };

    await this.redisService.redisClient.set(
      redisKey,
      JSON.stringify(clientData),
      'EX',
      3600 * 24,
    );
    return clientData;
  }

  private generateRandomProfile(): string {
    return Math.floor(Math.random() * 20 + 1).toString();
  }

  private generateRandomUsername(): string {
    const adjectives = ['빠른', '느린', '행복한', '슬픈', '강한', '약한'];
    const nouns = ['사자', '호랑이', '곰', '토끼', '늑대', '여우'];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNum = Math.floor(Math.random() * 1000);
    return `${adjective}${noun}${randomNum}`;
  }
}
