import { Role } from 'src/auth/role.enum';

export interface CreateUserDto {
  email: string;
  password: string;
  name: string;
  roles: Role[];
}
