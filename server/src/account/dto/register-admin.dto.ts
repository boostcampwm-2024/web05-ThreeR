import { IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const PASSWORD_REG = /^(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]+$/;

export class RegisterAdminDto {
  @ApiProperty({
    example: 'minseokjo',
    description: '관리자 로그인 아이디를 입력해주세요.',
  })
  @IsString()
  @Length(6, 255)
  loginId: string;

  @ApiProperty({
    example: 'heisgoat123!',
    description:
      '패스워드를 입력해주세요. (최소 6자, 영문/숫자/특수문자로 이루어질 수 있으며 특수문자 1개 이상 포함)',
  })
  @IsString()
  @Matches(PASSWORD_REG)
  @Length(6, 60)
  password: string;
}
