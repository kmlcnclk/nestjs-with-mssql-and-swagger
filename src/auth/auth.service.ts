import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from 'src/jwt/jwt.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly nestJwtService: NestJwtService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async generateTokens(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userService.findOneByEmail(loginDto.email);

    if (!user) throw new NotFoundException('User not found');

    const accessToken = await this.generateAccessToken(user.id);
    const refreshToken = await this.generateRefreshToken(user.id);

    await this.jwtService.createJwt({
      accessToken,
      refreshToken,
      user: { connect: { id: user.id } },
    });

    return { accessToken, refreshToken };
  }

  async generateAccessToken(userId: number) {
    const accessTokenSecret = await this.configService.get<string>(
      'ACCESS_TOKEN_SECRET',
    );

    const payload = { userId };
    return this.nestJwtService.signAsync(payload, {
      secret: accessTokenSecret,
      expiresIn: '7d',
    });
  }

  async generateRefreshToken(userId: number) {
    const refreshTokenSecret = await this.configService.get<string>(
      'REFRESH_TOKEN_SECRET',
    );

    const payload = { userId };
    return this.nestJwtService.signAsync(payload, {
      secret: refreshTokenSecret,
      expiresIn: '21d',
    });
  }
}
