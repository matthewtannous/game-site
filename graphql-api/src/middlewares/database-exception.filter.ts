import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { DatabaseException } from '../common/exceptions/database.exception';

@Catch(DatabaseException)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: DatabaseException, host: ArgumentsHost) {
    console.log(`Database exception: ${exception.getResponse()}`);
  }
}
