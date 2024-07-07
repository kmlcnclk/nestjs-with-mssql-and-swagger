import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private logger: Logger = new Logger('Database');

  async onModuleInit() {
    await this.$connect();

    this.logger.log('Connected to Database');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
