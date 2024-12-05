import { LoginAdminDto } from '../../../src/admin/dto/login-admin.dto';
import { validate } from 'class-validator';

describe('LoginAdminDto Test', () => {
  let loginAdminDto: LoginAdminDto;

  beforeEach(() => {
    loginAdminDto = new LoginAdminDto();
  });

  it('ID에 null이 입력되면 유효성 검사에 실패한다.', async () => {
    //given
    loginAdminDto.loginId = null;
    loginAdminDto.password = 'testAdminPassword';

    //when
    const errors = await validate(loginAdminDto);

    //then
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    expect(errors[0].constraints).toHaveProperty('isString');
  });
  it('패스워드에 null이 입력되면 유효성 검사에 실패한다.', async () => {
    //given
    loginAdminDto.loginId = 'testAdminId';
    loginAdminDto.password = null;

    //when
    const errors = await validate(loginAdminDto);

    //then
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    expect(errors[0].constraints).toHaveProperty('isString');
  });
});
