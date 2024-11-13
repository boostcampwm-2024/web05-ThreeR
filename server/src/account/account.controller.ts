import {
  Body,
  Controller,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiPostRegisterAdmin } from './account.api-docs';

@ApiTags('Account')
@Controller()
export class AccountController {
  constructor(
    private readonly loginService: AccountService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @ApiPostRegisterAdmin()
  @Post('/register/admin')
  @UsePipes(ValidationPipe)
  async registerAdmin(@Body() registerAdminDto: RegisterAdminDto) {
    const result = await this.loginService.registerAdmin(registerAdminDto);
    this.logger.info(`admin 등록: ${result.loginId}`);
    return {
      message: `성공적으로 관리자 계정이 생성되었습니다.`,
      statusCode: 201,
    };
  }
}
