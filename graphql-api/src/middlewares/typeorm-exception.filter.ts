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
    console.log(`TypeORM error: ${exception.message}`);
  }
}
