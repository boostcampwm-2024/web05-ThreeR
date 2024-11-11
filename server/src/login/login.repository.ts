import {Injectable} from "@nestjs/common";
import {DataSource, Repository} from "typeorm";
import {Admin} from "./login.entity";
import {RegisterAdminDto} from "./dto/register-admin.dto";


@Injectable()
export class LoginRepository extends Repository<Admin> {
    constructor(private dataSource: DataSource) {
        super(Admin, dataSource.createEntityManager());
    }

    async registerAdmin(registerAdminDto: RegisterAdminDto) {
        const {loginId, password} = registerAdminDto;
        const admin = this.create({
            loginId,
            password,
        });
        await this.save(admin);
        return admin;
    }
}