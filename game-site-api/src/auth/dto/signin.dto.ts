import { PartialType } from '@nestjs/mapped-types';
import { RegisterDTO } from './register.dto';

export class SignInDTO extends PartialType(RegisterDTO) {
  username: string;
  password: string;
}
