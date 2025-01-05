import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [ChatGateway],
})
export class ChatModule {}
