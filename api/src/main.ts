import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import { HttpExceptionFilter } from './middlewares/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DatabaseExceptionFilter } from './middlewares/database-exception.filter';
import { TypeOrmExceptionFilter } from './middlewares/typeorm-exception.filter';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

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

  // API documentation
  const config = new DocumentBuilder()
    .setTitle('Game Site')
    .setDescription('The game site API descrpiton')
    .setVersion('1.0')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.SERVER_PORT ?? 3000);
  // console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(
    `Application is running on: http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}\nAPI can be found on: http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/api`,
  );
}
bootstrap();
