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
import { AdminService } from './admin.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiPostLoginAdmin, ApiPostRegisterAdmin } from './admin.api-docs';
import { ApiResponse } from '../common/response/common.response';
import { LoginAdminDto } from './dto/login-admin.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly loginService: AdminService) {}

  @ApiPostLoginAdmin()
  @Post('/login')
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
  @Post('/register')
  @UsePipes(ValidationPipe)
  async registerAdmin(@Body() registerAdminDto: RegisterAdminDto) {
    await this.loginService.registerAdmin(registerAdminDto);
    return ApiResponse.responseWithNoContent(
      '성공적으로 관리자 계정이 생성되었습니다.',
    );
  }
}
