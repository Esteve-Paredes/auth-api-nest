import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() registerAuth: CreateUserDto) {
    return this.authService.register(registerAuth);
  }

  @Post('login')
  loginUser(@Body() loginDataUser: LoginAuthDto) {
    return this.authService.login(loginDataUser);
  }
}
