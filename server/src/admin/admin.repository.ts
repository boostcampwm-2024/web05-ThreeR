import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { RegisterAdminDto } from './dto/register-admin.dto';

@Injectable()
export class AdminRepository extends Repository<Admin> {
  constructor(private dataSource: DataSource) {
    super(Admin, dataSource.createEntityManager());
  }

  async createAdmin(registerAdminDto: RegisterAdminDto) {
    const { loginId, password } = registerAdminDto;
    const admin = this.create({
      loginId,
      password,
    });
    await this.save(admin);
    return admin;
  }
}
