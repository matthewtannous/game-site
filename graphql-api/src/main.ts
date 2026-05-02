import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './middlewares/http-exception.filter';
import { DatabaseExceptionFilter } from './middlewares/database-exception.filter';
import { TypeOrmExceptionFilter } from './middlewares/typeorm-exception.filter';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Exception handling
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new DatabaseExceptionFilter(),
    new TypeOrmExceptionFilter(),
  );

  // Enable validation
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

  // Enable CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);

  console.log(
    `Application is running on: http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
  );
}
bootstrap();
