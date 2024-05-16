import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, ResponseQuery } from './interface/response';

@Injectable()
export class ResponseService {
  createResponse(response: Response): ResponseQuery {
    //estructura de la respuesta
    const { message, data } = response;
    return {
      ok: true,
      message,
      data,
    };
  }

  createErrors(error: any) {
    if (error.code) {
      if (error.code === 11000)
        throw new BadRequestException(
          `User exists in db ${JSON.stringify(error.keyValue)}`,
        );
    } else {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message);
      }
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
