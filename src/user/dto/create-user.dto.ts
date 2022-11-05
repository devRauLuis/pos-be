import { Role } from '@prisma/client';

export class CreateUserDto {
  email: string;
  password: string;
  name: string;
  roles: Role[];
}
