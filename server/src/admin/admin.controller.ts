import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AdminService } from './admin.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCheckAdminSessionId,
  ApiLogout,
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
    @Req() request: Request,
  ) {
    await this.adminService.loginAdmin(loginAdminDto, response, request);
    return ApiResponse.responseWithNoContent(
      '로그인이 성공적으로 처리되었습니다.',
    );
  }

  @ApiLogout()
  @UseGuards(CookieAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/logout')
  async logoutAdmin(
    @Req() request: Request,
    @Res({ passthrough: true })
    response: Response,
  ) {
    await this.adminService.logoutAdmin(request, response);
    return ApiResponse.responseWithNoContent(
      '로그아웃이 성공적으로 처리되었습니다.',
    );
  }

  @ApiPostRegisterAdmin()
  @UseGuards(CookieAuthGuard)
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
