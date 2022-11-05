import { PartialType } from '@nestjs/mapped-types';
import { Role } from '@prisma/client';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  email: string;
  password: string;
  name: string;
  roles: Role[];
  hash: string;
}
