import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

import dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: Number(process.env.JWT_EXPIRES_IN) },
    }),
  ],

  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],

  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
