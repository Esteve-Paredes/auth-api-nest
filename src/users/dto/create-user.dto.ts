import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'newUser', minLength: 4 })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  name: string;

  @ApiProperty({ example: 'lastName_newUser', minLength: 4 })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  lastName: string;

  @ApiProperty({ example: 'email.example@mail.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', minLength: 4, maxLength: 12 })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(12)
  password: string;
}
