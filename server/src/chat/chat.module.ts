import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { RedisModule } from '../common/redis/redis.module';

@Module({
  imports: [RedisModule],
  providers: [ChatGateway],
})
export class ChatModule {}
