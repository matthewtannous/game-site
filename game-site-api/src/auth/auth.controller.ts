import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

import { SignInDTO } from './dto/signin.dto';
import { RegisterDTO } from './dto/register.dto';

import express from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(
    @Body() signInDto: SignInDTO,
    @Res({ passthrough: true }) res: express.Response
  ) {
    return this.authService.signIn(signInDto, res);
  }

  @Public()
  @Post('register')
  register(
    @Body() registerDto: RegisterDTO,
    @Res({ passthrough: true }) res: express.Response
  ) {
    return this.authService.register(registerDto, res);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: express.Response) {
    res.clearCookie('access_token');
    return { message: 'LOGGED OUT' };
  }

  // @Get('test')
  // getProfile(@Request() req: any) {
  //   return req.user;
  // }
}
