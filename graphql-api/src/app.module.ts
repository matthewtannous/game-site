import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

import { Request, Response } from 'express';

@Module({
  imports: [
    // For GraphQL
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      context: ({ req, res }: { req: Request; res: Response }) => ({ req, res }),

      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // For code first approach
      sortSchema: true, // sort the schema lexicographically

      formatError: (error) => {
        // DatabaseException
        if (error.extensions?.code === 'INTERNAL_SERVER_ERROR') {
          return {
            message: 'Bad Request Exception',
            details: [error.message],
          };
        }

        // Other (thrown by validators)
        const res = error.extensions?.originalError as {
          message: string[];
          error: string;
          statusCode: number;
        };

        return {
          message: error.message,
          details: res.message,
          // httpError: res.error,
          // statusCode: res.statusCode,
        };
      },
    }),
    // For .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // For PostgreSQL database
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
    }),
    // Entities
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
