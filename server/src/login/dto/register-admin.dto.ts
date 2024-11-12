import { IsString } from 'class-validator';

export class RegisterAdminDto {
  @IsString()
  loginId: string;

  @IsString()
  password: string;
}
