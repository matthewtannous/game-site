import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

import { RegisterDTO } from './dto/register.dto';
import { SignInDTO } from './dto/signin.dto';

import { Response } from 'express';

import bcrypt from 'bcryptjs';
import { DatabaseException } from 'src/common/exceptions/database.exception';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    signInDto: SignInDTO,
    res: Response,
  ): // Promise<{ access_token: string }>
  Promise<any> {
    const user = await this.usersService.findOneByUsername(signInDto.username);

    if (!user) {
      // throw new DatabaseException('User not found');
      throw new DatabaseException('Invalid Username or Password');
    }

    if (!bcrypt.compareSync(signInDto.password, user.password)) {
      // throw new DatabaseException("Invalid Password");
      throw new DatabaseException('Invalid Username or Password');
    }

    // Generate a JWT and return it
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };

    const token = await this.jwtService.signAsync(payload);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false, // for development
      sameSite: 'lax',
      maxAge: Number(process.env.JWT_EXPIRES_IN), // 1 day
    });

    // return {
    //   access_token: token,
    // };

    const { password, ...noPassUser } = user;
    return noPassUser;
  }

  async register(
    registerDTO: RegisterDTO,
    res: Response,
  ): // Promise<{ access_token: string }>
  Promise<any> {
    const user = await this.usersService.create(registerDTO);
    // Generate a JWT and return it
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };

    const token = await this.jwtService.signAsync(payload);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false, // for development
      sameSite: 'lax',
      maxAge: Number(process.env.JWT_EXPIRES_IN), // 1 day
    });

    // return {
    //   access_token: token,
    // };

    const { password, ...noPassUser } = user;
    return noPassUser;
  }
}
