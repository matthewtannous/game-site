import { PartialType } from '@nestjs/swagger';
import { RegisterDTO } from './register.dto';

import { IsNotEmpty } from 'class-validator';

export class SignInDTO extends PartialType(RegisterDTO) {
  @IsNotEmpty()
  username: string;

  // Do not enforce strong password on login (because of sample data in database)
  @IsNotEmpty()
  password: string;
}
