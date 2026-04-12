import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { TypeORMError } from 'typeorm';
import { Response } from 'express';

@Catch(TypeORMError) // Catch all errors originating from TypeORM
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.log(`TypeORM error: ${exception.message}`);

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message,
    });
  }
}
