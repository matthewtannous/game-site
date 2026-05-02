import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

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
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) { }

  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.usersRepository.find({
      select: selectedColumns,
    });
  }

  findOne(id: number) {
    return this.usersRepository.findOne({
      select: selectedColumns,
      where: {
        id: id,
      },
    });
  }

  findAllExcept(id: number) {
        return this.usersRepository.find({
      select: selectedColumns,
      where: {
        id: Not(id),
      },
      order: {
        username: 'ASC',
      },
    });

  }

  update(updateUserInput: UpdateUserInput) {
    return this.usersRepository.update(updateUserInput.id, updateUserInput);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
