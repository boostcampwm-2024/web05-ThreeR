import {
  Body,
  Controller,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Account')
@Controller()
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post('/register/admin')
  @UsePipes(ValidationPipe)
  @ApiOperation({
    summary: `관리자 회원 가입`,
    description: `새로운 관리자 계정을 등록합니다.`,
  })
  @ApiBody({
    type: RegisterAdminDto,
    description: `관리자 등록 정보`,
  })
  @ApiResponse({
    status: 201,
    description: '관리자 계정 생성 성공',
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 요청 (유효성 검사 실패)',
  })
  @ApiResponse({
    status: 409,
    description: '이미 존재하는 관리자 계정',
  })
  async registerAdmin(@Body() registerAdminDto: RegisterAdminDto) {
    const result = await this.loginService.registerAdmin(registerAdminDto);
    this.logger.info(`admin 등록: ${result.loginId}`);
    return {
      status: 201,
      message: `성공적으로 관리자 계정이 생성되었습니다.`,
    };
  }
}
