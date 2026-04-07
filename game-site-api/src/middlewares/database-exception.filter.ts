import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { DatabaseException } from 'src/common/exceptions/database.exception';

@Catch(DatabaseException)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: DatabaseException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const exceptionResponse = exception;

    console.log(`Database exception: ${exceptionResponse.message}`);

    response.status(HttpStatus.BAD_REQUEST).json(exceptionResponse.message);
  }
}
