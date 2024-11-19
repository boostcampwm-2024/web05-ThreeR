import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { AdminRepository } from './admin.repository';
import * as bcrypt from 'bcrypt';
import { cookieConfig } from '../common/cookie/cookie.config';
import * as uuid from 'uuid';
import { RedisService } from '../common/redis/redis.service';
import { LoginAdminDto } from './dto/login-admin.dto';

@Injectable()
export class AdminService {
  // 12시간 후 자동 만료
  private readonly SESSION_TTL = 60 * 60 * 12;

  constructor(
    private readonly loginRepository: AdminRepository,
    private readonly redisService: RedisService,
  ) {}

  async loginAdmin(loginAdminDto: LoginAdminDto, response: Response) {
    const { loginId, password } = loginAdminDto;

    const admin = await this.loginRepository.findOne({
      where: { loginId },
    });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      throw new UnauthorizedException('아이디 혹은 비밀번호가 잘못되었습니다.');
    }

    const sessionId = uuid.v4();

    await this.redisService.set(
      sessionId,
      admin.loginId,
      `EX`,
      this.SESSION_TTL,
    );

    response.cookie('sessionId', sessionId, cookieConfig[process.env.NODE_ENV]);
  }

  async registerAdmin(registerAdminDto: RegisterAdminDto) {
    let { loginId, password } = registerAdminDto;

    const existingAdmin = await this.loginRepository.findOne({
      where: { loginId },
    });

    if (existingAdmin) {
      throw new ConflictException('이미 존재하는 아이디입니다.');
    }

    const saltRounds = 10;
    password = await bcrypt.hash(password, saltRounds);

    return this.loginRepository.registerAdmin({ loginId, password });
  }
}
