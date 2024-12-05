import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';
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
    private readonly adminRepository: AdminRepository,
    private readonly redisService: RedisService,
  ) {}

  async loginAdmin(
    loginAdminDto: LoginAdminDto,
    response: Response,
    request: Request,
  ) {
    const cookie = request.cookies['sessionId'];
    const { loginId, password } = loginAdminDto;

    const admin = await this.adminRepository.findOne({
      where: { loginId },
    });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      throw new UnauthorizedException('아이디 혹은 비밀번호가 잘못되었습니다.');
    }

    const sessionId = uuid.v4();

    if (cookie) {
      this.redisService.redisClient.del(`auth:${cookie}`);
    }

    let cursor = '0';
    let scanFlag = false;
    do {
      const [newCursor, keys] = await this.redisService.redisClient.scan(
        cursor,
        'MATCH',
        'auth:*',
        'COUNT',
        100,
      );

      cursor = newCursor;

      if (!keys.length) {
        break;
      }

      const values = await this.redisService.redisClient.mget(keys);

      for (let i = 0; i < keys.length; i++) {
        const sessionValue = values[i];
        if (sessionValue === loginId) {
          await this.redisService.redisClient.del(keys[i]);
          scanFlag = true;
          break;
        }
      }
      if (scanFlag) {
        break;
      }
    } while (cursor !== '0');

    this.redisService.redisClient.set(
      `auth:${sessionId}`,
      admin.loginId,
      `EX`,
      this.SESSION_TTL,
    );

    response.cookie('sessionId', sessionId, cookieConfig[process.env.NODE_ENV]);
  }

  async logoutAdmin(request: Request, response: Response) {
    const sid = request.cookies['sessionId'];
    this.redisService.redisClient.del(`auth:${sid}`);
    response.clearCookie('sessionId');
  }

  async createAdmin(registerAdminDto: RegisterAdminDto) {
    let { loginId, password } = registerAdminDto;

    const existingAdmin = await this.adminRepository.findOne({
      where: { loginId },
    });

    if (existingAdmin) {
      throw new ConflictException('이미 존재하는 아이디입니다.');
    }

    const saltRounds = 10;
    password = await bcrypt.hash(password, saltRounds);

    await this.adminRepository.createAdmin({ loginId, password });
  }
}
