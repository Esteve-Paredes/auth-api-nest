import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/entities/user.entity';
import { Model } from 'mongoose';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ResponseService } from 'src/services/response.service';
import { ResponseQuery } from 'src/services/interface/response';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private responseService: ResponseService,
  ) {}

  async register(registerAuth: CreateUserDto) {
    try {
      const { email, password } = registerAuth;
      const findUser: User = await this.userModel.findOne({ email });
      if (findUser) throw new ConflictException('Email ya esta en uso');

      const plainToHash = await hash(password, 10);
      registerAuth = { ...registerAuth, password: plainToHash };

      //registrar en la base de datos con la contraseña hasheada
      const data = await this.userModel.create(registerAuth);
      return this.responseService.createResponse({
        message: 'Usuario creado con Exito',
        data: this.ResponseAuth(data),
      });
    } catch (error) {
      this.responseService.createErrors(error);
    }
  }

  async login(loginDataUser: LoginAuthDto): Promise<ResponseQuery> {
    try {
      const { email, password } = loginDataUser;
      const findUser: User = await this.userModel.findOne({ email });
      if (!findUser) throw new NotFoundException('User Not Found');
      const checkPassword = await compare(password, findUser.password);
      if (!checkPassword) throw new UnauthorizedException('Password Icorrect');

      const token = this.jwtService.sign({
        //payload
        id: findUser.id,
        email: findUser.email,
      });

      return this.responseService.createResponse({
        data: this.ResponseAuth(findUser, token),
      });
    } catch (error) {
      this.responseService.createErrors(error);
    }
  }

  private ResponseAuth(user: User, token?: string) {
    //crear un nuevo userdata sin el password
    return {
      user: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      },
      token,
    };
  }
}
