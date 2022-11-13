import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { comparePasswords } from 'src/utils/argon';
import { LogUserDto } from './dto/log-user.dto';
@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<Partial<User>> {
    const user = await this.userService.findOne({ email });
    if (!user) return null;
    const match = await comparePasswords(password, user.hash);
    return match ? user : null;
  }

  async login(payload: LogUserDto) {
    const { email, password } = payload;
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException();
    return { accessToken: await this.jwtService.signAsync({ id: user.id, email: user.email }) };
  }
}
