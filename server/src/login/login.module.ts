import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './login.entity';
import { LoginRepository } from './login.repository';
import { winstonModule } from '../common/logger/logger.module';

@Module({
  imports: [winstonModule, TypeOrmModule.forFeature([Admin])],
  controllers: [LoginController],
  providers: [LoginService, LoginRepository],
})
export class LoginModule {}
