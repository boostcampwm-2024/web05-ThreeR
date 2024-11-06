import { Module } from '@nestjs/common';

import { winstonModule } from './common/logger/logger.module';

@Module({
  imports: [winstonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
