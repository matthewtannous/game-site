import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BasicUserDto } from './dto/basic-user.dto';

// For database
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';

import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

const selectedColumns = {
  id: true,
  username: true,
  email: true,
  createdAt: true,
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = bcrypt.hashSync(
      createUserDto.password,
      SALT_ROUNDS,
    );
    return this.usersRepository.save(createUserDto);
  }

  findAll(): Promise<BasicUserDto[]> {
    return this.usersRepository.find({
      select: selectedColumns,
    });
  }

  findOne(id: number): Promise<User | null> {
    // return this.usersRepository.findOneBy({ id: id });
    return this.usersRepository.findOne({
      select: selectedColumns,
      where: {
        id: id,
      }
    });
  }

  findAllExceptOne(id: number): Promise<User[]> {
    return this.usersRepository.find({
      select: selectedColumns,
      where: {
        id: Not(id),
      },
      order: {
        username: "ASC",
      }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  // Other operations (for auth, must return all data)
  findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username: username });
  }
}
