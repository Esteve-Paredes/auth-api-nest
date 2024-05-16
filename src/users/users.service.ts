import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseService } from 'src/services/response.service';
import { ResponseQuery } from 'src/services/interface/response';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private responseService: ResponseService,
  ) {}

  async finAll(): Promise<ResponseQuery> {
    try {
      const allUsers = await this.userModel.find();
      const users = [];
      allUsers.forEach((user) => {
        users.push(this.UserData(user));
      });
      return this.responseService.createResponse({
        data: users,
      });
    } catch (error) {
      this.responseService.createErrors(error);
    }
  }

  async findOneById(id: string): Promise<ResponseQuery> {
    try {
      const userId = await this.userModel.findOne({ id });
      if (!userId) throw new NotFoundException('id no encontrado');
      return this.responseService.createResponse({
        data: this.UserData(userId),
      });
    } catch (error) {
      this.responseService.createErrors(error);
    }
  }

  async update(
    id: string,
    userData: Partial<CreateUserDto>,
  ): Promise<ResponseQuery> {
    try {
      const userUpdate = await this.userModel.findOneAndUpdate(
        { id },
        userData,
        { new: true },
      );
      return this.responseService.createResponse({
        message: 'user Actualizado con Exito',
        data: this.UserData(userUpdate),
      });
    } catch (error) {
      this.responseService.createErrors(error);
    }
  }

  async delete(id: string): Promise<ResponseQuery> {
    try {
      const userDelete = await this.userModel.findOneAndDelete({ id });
      return this.responseService.createResponse({
        message: 'user Eliminado con Exito',
        data: this.UserData(userDelete),
      });
    } catch (error) {
      this.responseService.createErrors(error);
    }
  }

  private UserData(user: User) {
    //crear un nuevo userData sin el password
    return {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
    };
  }
}
