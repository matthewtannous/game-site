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

    response.status(status).json(exceptionResponse.message);
  }
}
