import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ResponseService } from 'src/services/response.service';
import { JwtStrategy } from 'src/auth/strategy/jwt-strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, ResponseService],
})
export class UsersModule {}
