import { IsString, Length, Matches } from 'class-validator';

const PASSWORD_REG = /^(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]+$/;

export class RegisterAdminDto {
  @IsString()
  @Length(6, 255)
  loginId: string;

  @IsString()
  @Matches(PASSWORD_REG)
  @Length(6, 60)
  password: string;
}
