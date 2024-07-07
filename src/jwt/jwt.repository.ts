import { Injectable } from '@nestjs/common';
import { Jwt, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.JwtCreateInput): Promise<Jwt> {
    return this.prisma.jwt.create({ data });
  }

  async findAll(): Promise<Jwt[]> {
    return this.prisma.jwt.findMany();
  }

  async findOne(id: number): Promise<Jwt | null> {
    return this.prisma.jwt.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.JwtUpdateInput): Promise<Jwt> {
    return this.prisma.jwt.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Jwt> {
    return this.prisma.jwt.delete({ where: { id } });
  }
}
