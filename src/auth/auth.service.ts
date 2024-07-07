import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async generateTokens(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userService.findOneByEmail(loginDto.email);

    if (!user) throw new NotFoundException('User not found');

    const accessToken = await this.generateAccessToken(user.id);
    const refreshToken = await this.generateRefreshToken(user.id);

    return { accessToken, refreshToken };
  }

  async generateAccessToken(userId: number) {
    const payload = { userId };
    return this.jwtService.signAsync(payload, {
      secret: 'yourAccessTokenSecret',
      expiresIn: '7d',
    });
  }

  async generateRefreshToken(userId: number) {
    const payload = { userId };
    return this.jwtService.signAsync(payload, {
      secret: 'yourRefreshTokenSecret',
      expiresIn: '21d',
    });
  }
}
