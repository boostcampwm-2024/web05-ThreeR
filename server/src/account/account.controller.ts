import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { AccountService } from './account.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiPostLoginAdmin, ApiPostRegisterAdmin } from './account.api-docs';
import { ApiResponse } from '../common/response/common.response';
import { LoginAdminDto } from './dto/login-admin.dto';

@ApiTags('Account')
@Controller()
export class AccountController {
  constructor(
    private readonly loginService: AccountService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @ApiPostLoginAdmin()
  @Post('/login/admin')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  async loginAdmin(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.loginService.loginAdmin(loginAdminDto, response);
    this.logger.info(`admin 로그인: ${loginAdminDto.loginId}`);
    
    return ApiResponse.responseWithNoContent(
      '로그인이 성공적으로 처리되었습니다.',
    );
  }

  @ApiPostRegisterAdmin()
  @Post('/register/admin')
  @UsePipes(ValidationPipe)
  async registerAdmin(@Body() registerAdminDto: RegisterAdminDto) {
    const result = await this.loginService.registerAdmin(registerAdminDto);
    this.logger.info(`admin 등록: ${result.loginId}`);
    return ApiResponse.responseWithNoContent(
      '성공적으로 관리자 계정이 생성되었습니다.',
    );
  }
}
