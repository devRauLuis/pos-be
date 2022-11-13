import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly config: ConfigService) {
    super();
  }

  handleRequest(err, user) {
    const isJwtEnabled = this.config.get<boolean>('JWT_ENABLED');
    if (!isJwtEnabled) return user;
    if (err || !user) throw new UnauthorizedException();
    return user;
  }
}
