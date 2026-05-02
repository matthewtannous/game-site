/**
 * Exception handlers are only used to print messages to the console.
 * Returning formatted error messages is handled in app.module.ts with GraphQLModule.forRoot
 */

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse() as {
      message: string[] | string;
      error: string;
      statusCode: number;
    };

    const msg = exceptionResponse.message;
    let errorMessage = `Error code: ${status} - `;

    if (Array.isArray(msg)) {
      if (msg.length === 1) {
        errorMessage += `Error: ${msg[0]}`;
      } else {
        errorMessage += 'Errors: ';
        for (const error of msg) {
          errorMessage += `\n\t${error}`;
        }
      }
    } else {
      errorMessage += `Error: ${msg}`;
    }

    console.log(errorMessage);
  }
}
