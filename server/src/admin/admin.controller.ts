import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { AdminService } from './admin.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCheckAdminSessionId,
  ApiPostLoginAdmin,
  ApiPostRegisterAdmin,
} from './admin.api-docs';
import { ApiResponse } from '../common/response/common.response';
import { LoginAdminDto } from './dto/login-admin.dto';
import { CookieAuthGuard } from '../common/guard/auth.guard';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiPostLoginAdmin()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  async loginAdmin(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.adminService.loginAdmin(loginAdminDto, response);
    return ApiResponse.responseWithNoContent(
      '로그인이 성공적으로 처리되었습니다.',
    );
  }

  @ApiPostRegisterAdmin()
  @Post('/register')
  @UsePipes(ValidationPipe)
  async registerAdmin(@Body() registerAdminDto: RegisterAdminDto) {
    await this.adminService.registerAdmin(registerAdminDto);
    return ApiResponse.responseWithNoContent(
      '성공적으로 관리자 계정이 생성되었습니다.',
    );
  }

  @ApiCheckAdminSessionId()
  @Get('/sessionId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(CookieAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async checkAdminSessionId() {
    return ApiResponse.responseWithNoContent('정상적인 sessionId 입니다.');
  }
}
