import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { winstonModule } from './common/logger/logger.module';

@Module({
  imports: [winstonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
