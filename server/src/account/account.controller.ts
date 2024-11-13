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
import { ApiPostRegisterAdmin } from './account.api-docs';
import { ApiResponse } from '../common/response/common.response';

@ApiTags('Account')
@Controller()
export class AccountController {
  constructor(
    private readonly loginService: AccountService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post('/login/admin')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @ApiOperation({
    summary: `관리자 로그인`,
  })
  @ApiBody({
    type: RegisterAdminDto,
    description: `관리자 등록 정보`,
  })
  @ApiResponse({
    status: 200,
    description: '관리자 계정 로그인 성공',
    schema: {
      example: {
        statusCode: 200,
        data: {
          message: '로그인이 성공적으로 처리되었습니다.',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 요청 (유효성 검사 실패)',
  })
  @ApiResponse({
    status: 401,
    description: '잘못된 아이디 혹은 비밀번호',
  })
  async loginAdmin(
    @Body() registerAdminDto: RegisterAdminDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.loginService.loginAdmin(registerAdminDto, response);
    return {
      message: '로그인이 성공적으로 처리되었습니다.',
    };
  }

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
