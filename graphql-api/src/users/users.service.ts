import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

// For database
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import bcrypt from 'bcryptjs';
import { DatabaseException } from '../common/exceptions/database.exception';

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
  ) {}

  async create(createUserInput: CreateUserInput) {
    // Hash the password
    createUserInput.password = bcrypt.hashSync(
      createUserInput.password,
      SALT_ROUNDS,
    );

    // Check if username already exists in the database
    const exists = await this.usersRepository.findOneBy({
      username: createUserInput.username,
    });
    if (exists) {
      throw new DatabaseException('Username already exists');
    }

    // Add user
    const res = await this.usersRepository.save(createUserInput);

    return res;
  }

  async findAll() {
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
    this.usersRepository.update(updateUserInput.id, updateUserInput);
    const res = this.usersRepository.findOneBy({ id: updateUserInput.id });
    return res;
  }

  remove(id: number) {
    const res = this.usersRepository.findOneBy({ id: id });
    this.usersRepository.delete(id);
    return res;
  }

  // Other operations (for auth, must return all data)
  findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username: username });
  }
}
