import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './account.entity';
import { AccountRepository } from './account.repository';
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
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
})
export class AccountModule {}
