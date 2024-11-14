import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAdminDto {
  @ApiProperty({
    example: 'minseokjo',
    description: '관리자 로그인 아이디를 입력해주세요.',
  })
  @IsNotEmpty({
    message: '아이디가 없습니다.',
  })
  @IsString({
    message: '문자열을 입력해주세요',
  })
  loginId: string;

  @ApiProperty({
    example: 'heisgoat123!',
    description: '패스워드를 입력해주세요.',
  })
  @IsNotEmpty({
    message: '패스워드가 없습니다.',
  })
  @IsString({
    message: '문자열을 입력해주세요',
  })
  password: string;
}
