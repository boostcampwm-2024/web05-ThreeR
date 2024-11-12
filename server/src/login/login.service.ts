import { BadRequestException, Injectable } from '@nestjs/common';
import type { RegisterAdminDto } from './dto/register-admin.dto';
import { LoginRepository } from './login.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(private loginRepository: LoginRepository) {}

  async registerAdmin(registerAdminDto: RegisterAdminDto) {
    let { loginId, password } = registerAdminDto;

    const existingAdmin = await this.loginRepository.findOne({
      where: { loginId },
    });

    if (existingAdmin) {
      throw new BadRequestException('이미 존재하는 아이디입니다.');
    }

    const saltRounds = 10;
    password = await bcrypt.hash(password, saltRounds);

    return this.loginRepository.registerAdmin({ loginId, password });
  }
}
