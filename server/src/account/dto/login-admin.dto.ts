import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAdminDto {
  @ApiProperty({
    example: 'minseokjo',
    description: '관리자 로그인 아이디',
  })
  @IsString()
  @Length(6, 255)
  loginId: string;

  @ApiProperty({
    example: 'heisgoat123!',
    description:
      '패스워드 (최소 6자, 영문/숫자/특수문자로 이루어질 수 있으며 특수문자 1개 이상 포함)',
  })
  @IsString()
  @Length(6, 60)
  password: string;
}
