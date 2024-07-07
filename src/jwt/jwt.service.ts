import { Injectable } from '@nestjs/common';
import { JwtRepository } from './jwt.repository';
import { Jwt, Prisma } from '@prisma/client';

@Injectable()
export class JwtService {
  constructor(private readonly jwtRepository: JwtRepository) {}

  async createJwt(data: Prisma.JwtCreateInput): Promise<Jwt> {
    return this.jwtRepository.create(data);
  }
}
