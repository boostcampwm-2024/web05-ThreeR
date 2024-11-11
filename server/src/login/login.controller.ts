import {Body, Controller, Get, HttpException, HttpStatus, Inject, Post, UsePipes, ValidationPipe} from "@nestjs/common";
import {LoginService} from "./login.service";
import {WINSTON_MODULE_PROVIDER} from "nest-winston";
import {Logger} from "winston";
import {RegisterAdminDto} from "./dto/register-admin.dto";


@Controller()
export class LoginController {

    constructor(private readonly loginService: LoginService, @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) {
    }

    @Post('/register/admin')
    @UsePipes(ValidationPipe)
    async registerAdmin(@Body() registerAdminDto: RegisterAdminDto) {
        const result = await this.loginService.registerAdmin(registerAdminDto);
        this.logger.info(`admin 등록: ${result.loginId}`);
        return {
            status: 201,
            message: `성공적으로 관리자 계정이 생성되었습니다.`
        }
    }
}