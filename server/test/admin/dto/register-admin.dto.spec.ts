import { RegisterAdminDto } from '../../../src/admin/dto/register-admin.dto';
import { validate } from 'class-validator';

describe('LoginAdminDto Test', () => {
  let registerAdminDto: RegisterAdminDto;

  beforeEach(() => {
    registerAdminDto = new RegisterAdminDto();
  });

  it('ID의 길이가 6 이상, 255 이하가 아니라면 유효성 검사에 실패한다.', async () => {
    //given
    registerAdminDto.loginId = 'test';
    registerAdminDto.password = 'testAdminPassword!';

    //when
    const errors = await validate(registerAdminDto);

    //then
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('isLength');
  });

  it('패스워드의 길이가 6 이상, 60 이하가 아니라면 유효성 검사에 실패한다.', async () => {
    //given
    registerAdminDto.loginId = 'testId';
    registerAdminDto.password = 'test';

    //when
    const errors = await validate(registerAdminDto);

    //then
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('isLength');
  });

  it('패스워드에 특수문자가 하나 이상 없다면 유효성 검사에 실패한다.', async () => {
    //given
    registerAdminDto.loginId = 'testAdminId';
    registerAdminDto.password = 'testAdminPassword';

    //when
    const errors = await validate(registerAdminDto);

    //then
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('ID에 null이 입력되면 유효성 검사에 실패한다.', async () => {
    //given
    registerAdminDto.loginId = null;
    registerAdminDto.password = 'testAdminPassword!';

    //when
    const errors = await validate(registerAdminDto);

    //then
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('isString');
  });

  it('패스워드에 null이 입력되면 유효성 검사에 실패한다.', async () => {
    //given
    registerAdminDto.loginId = 'testAdminId';
    registerAdminDto.password = null;

    //when
    const errors = await validate(registerAdminDto);

    //then
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('isString');
    expect(errors[0].constraints).toHaveProperty('matches');
  });
});
