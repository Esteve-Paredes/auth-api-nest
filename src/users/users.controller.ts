import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userServices: UsersService) {}

  @Get()
  async getAllUsers() {
    return await this.userServices.finAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.userServices.findOneById(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: Partial<CreateUserDto>,
  ) {
    return await this.userServices.update(id, userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userServices.delete(id);
  }
}
