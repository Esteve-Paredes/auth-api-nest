import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiBearerAuth()
@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userServices: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. No valid authentication token provided.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error. Something went wrong on the server.',
  })
  async getAllUsers() {
    return await this.userServices.finAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, description: 'Return a user' })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. No valid authentication token provided.',
  })
  @ApiResponse({ status: 404, description: 'user not found' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error. Something went wrong on the server.',
  })
  async getUserById(@Param('id') id: string) {
    return await this.userServices.findOneById(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({ status: 200, description: 'Successfully updated user' })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. No valid authentication token provided.',
  })
  @ApiResponse({ status: 404, description: 'user not found' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error. Something went wrong on the server.',
  })
  async updateUser(
    @Param('id') id: string,
    @Body() userData: Partial<CreateUserDto>,
  ) {
    return await this.userServices.update(id, userData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'Successfully deleted user' })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. No valid authentication token provided.',
  })
  @ApiResponse({ status: 404, description: 'user not found' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error. Something went wrong on the server.',
  })
  async deleteUser(@Param('id') id: string) {
    return await this.userServices.delete(id);
  }
}
