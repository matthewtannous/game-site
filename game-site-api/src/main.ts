import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import { HttpExceptionFilter } from './middlewares/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DatabaseExceptionFilter } from './middlewares/database-exception.filter';
import { TypeOrmExceptionFilter } from './middlewares/typeorm-exception.filter';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new DatabaseExceptionFilter(),
    new TypeOrmExceptionFilter(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
      stopAtFirstError: true,

      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.use(cookieParser()); // cookies available as req.cookies
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  });
  await app.listen(process.env.SERVER_PORT ?? 3000);
  // console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(
    `Application is running on: http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
  );
}
bootstrap();
