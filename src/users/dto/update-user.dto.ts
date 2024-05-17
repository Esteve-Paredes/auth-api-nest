import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: 'newUser',
    minLength: 4,
    required: false,
    description: 'The first name of the user',
  })
  @IsOptional()
  @IsString()
  @MinLength(4)
  name?: string;

  @ApiProperty({
    example: 'lastName_newUser',
    minLength: 4,
    required: false,
    description: 'The last name of the user',
  })
  @IsOptional()
  @IsString()
  @MinLength(4)
  lastName?: string;

  @ApiProperty({
    example: 'email.example@mail.com',
    required: false,
    description: 'The email address of the user',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: 'password123',
    minLength: 4,
    maxLength: 12,
    required: false,
    description: 'The password for the user account',
  })
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(12)
  password?: string;
}
