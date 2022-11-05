import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user) {
    const isJwtEnabled = JSON.parse(process.env.JWT_ENABLED);
    if (!isJwtEnabled) return user;
    if (err || !user) throw new UnauthorizedException();
  }
}
