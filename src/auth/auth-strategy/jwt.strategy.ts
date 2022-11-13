import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService, private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: config.get<boolean>('JWT_IGNORE_EXPIRATION') || false,
      secretOrKey: config.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: Partial<User>) {
    return this.userService.findOne({ id: payload.id });
  }
}
