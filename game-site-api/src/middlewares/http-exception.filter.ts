import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // response
    //     .status(status)
    //     .json({
    //         statusCode: status,
    //         timestamp: new Date().toISOString(),
    //         path: request.url,
    //     });

    const exceptionResponse = exception.getResponse() as {
      message: string[];
      error: string;
      statusCode: number;
    };

    console.log('\n\n');
    console.log(exceptionResponse);

    let errorMessage = `Error code: ${status} - `;
    if (exceptionResponse.message.length === 1) {
      errorMessage += `Error: ${exceptionResponse.message[0]}`;
    } else {
      errorMessage += 'Errors: ';
      for (let error of exceptionResponse.message) {
        errorMessage += `\n\t${error}`;
      }
    }

    console.log(errorMessage);

    response.status(status).json(exceptionResponse.message);
  }
}
