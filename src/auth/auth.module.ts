import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtModule } from '../jwt/jwt.module';

@Module({
  imports: [NestJwtModule, JwtModule, UserModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
