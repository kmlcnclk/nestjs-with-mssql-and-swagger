import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JwtRepository } from './jwt.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [JwtService, JwtRepository],
  exports: [JwtService],
})
export class JwtModule {}
