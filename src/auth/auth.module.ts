import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { ResponseService } from 'src/services/response.service';

@Module({
  //interactuar con la capa de datos de user
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ResponseService],
})
export class AuthModule {}
