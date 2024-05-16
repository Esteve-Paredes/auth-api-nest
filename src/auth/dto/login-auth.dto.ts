import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsNotEmpty()
  email: string;
  @MinLength(4)
  @MaxLength(12)
  password: string;
}
