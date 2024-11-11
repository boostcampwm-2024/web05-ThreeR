import {BadRequestException, Injectable} from "@nestjs/common";
import type {RegisterAdminDto} from "./dto/register-admin.dto";
import {LoginRepository} from "./login.repository";
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
    constructor(private loginRepository: LoginRepository) {
    }

    async registerAdmin(registerAdminDto: RegisterAdminDto) {
        let {loginId, password} = registerAdminDto;

        await this.validateAdmin(loginId, password);

        const existingAdmin = await this.loginRepository.findOne({
            where: {loginId}
        });

        if (existingAdmin) {
            throw new BadRequestException('이미 존재하는 아이디입니다.');
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        password = await bcrypt.hash(password, salt);

        return this.loginRepository.registerAdmin({loginId, password});
    }

    private async validateAdmin(loginId: string, password: string) {
        const passwordReg = /^(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]+$/;
        if(loginId.length < 6) {
            throw new BadRequestException("아이디의 길이는 6글자 이상이어야 합니다.");
        }

        if(password.length < 6) {
            throw new BadRequestException("패스워드의 길이는 6글자 이상이어야 합니다.");
        }

        if(!password.match(passwordReg)) {
            throw new BadRequestException("패스워드는 특수문자(!, @, #, $, %, ^, &, *, (, ), _, +)를 1개 이상 포함해야 합니다.");
        }
    }
}