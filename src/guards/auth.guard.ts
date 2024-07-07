import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }
    try {
      const accessTokenSecret = await this.configService.get<string>(
        'ACCESS_TOKEN_SECRET',
      );
      const payload = await this.jwtService.verifyAsync(token, {
        secret: accessTokenSecret,
      });

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Token is invalid or expired');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    console.log(request.headers.authorization);
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    console;
    return type === 'Bearer' ? token : undefined;
  }
}
