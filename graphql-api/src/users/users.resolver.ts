import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PublicUserDto } from './dto/public-user.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => PublicUserDto)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [PublicUserDto], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => [PublicUserDto], { name: 'usersExcept' })
  findAllExcept(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findAllExcept(id);
  }

  @Query(() => PublicUserDto, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => PublicUserDto)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput);
  }

  @Mutation(() => PublicUserDto)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
