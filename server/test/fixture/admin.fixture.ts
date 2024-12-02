import { Admin } from '../../src/admin/admin.entity';

export class AdminFixture {
  static readonly GENERAL_ADMIN = {
    loginId: 'test1234',
    password: '$2b$10$TGsf41ADKaziH5NgaDwec.JLue60QHk8DIZrFnJ9S6dZObN5humAe', // test1234!
  };
  static createAdminFixture(overwrites: Partial<Admin> = {}): Admin {
    const admin = new Admin();
    Object.assign(admin, this.GENERAL_ADMIN);
    return Object.assign(admin, overwrites);
  }
}