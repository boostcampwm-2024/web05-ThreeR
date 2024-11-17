import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { AdminRepository } from './admin.repository';
import { winstonModule } from '../common/logger/logger.module';
import { RedisModule } from '../redis/redis.module';
import { EmailModule } from '../common/email/email.module';

@Module({
  imports: [
    winstonModule,
    TypeOrmModule.forFeature([Admin]),
    RedisModule,
    EmailModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository],
})
export class AdminModule {}
