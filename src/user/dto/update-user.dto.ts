import { Role } from 'src/auth/role.enum';

export interface UpdateUserDto {
  email: string;
  password: string;
  name: string;
  roles: Role[];
  hash: string;
}
