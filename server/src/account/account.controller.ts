import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { AccountService } from './account.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiPostLoginAdmin, ApiPostRegisterAdmin } from './account.api-docs';
import { ApiResponse } from '../common/response/common.response';
import { LoginAdminDto } from './dto/login-admin.dto';

@ApiTags('Account')
@Controller()
export class AccountController {
  constructor(private readonly loginService: AccountService) {}

  @ApiPostLoginAdmin()
  @Post('/login/admin')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  async loginAdmin(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.loginService.loginAdmin(loginAdminDto, response);
    return ApiResponse.responseWithNoContent(
      '로그인이 성공적으로 처리되었습니다.',
    );
  }

  @ApiPostRegisterAdmin()
  @Post('/register/admin')
  @UsePipes(ValidationPipe)
  async registerAdmin(@Body() registerAdminDto: RegisterAdminDto) {
    await this.loginService.registerAdmin(registerAdminDto);
    return ApiResponse.responseWithNoContent(
      '성공적으로 관리자 계정이 생성되었습니다.',
    );
  }
}
