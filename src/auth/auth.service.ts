import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { comparePasswords } from 'src/utils/bcrypt';
import { LogUserDto } from './dto/log-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<Partial<User>> {
    const user = await this.userService.findOne({ email });
    if (!user) return null;
    const match = comparePasswords(password, user.password);
    return match ? user : null;
  }

  async login(payload: LogUserDto) {
    const user = await this.userService.findOne(payload);
    return { accessToken: this.jwtService.sign(user) };
  }
}
