import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { configDotenv } from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from './exceptionFilters/prismaClientExceptionFilter';
import { GlobalExceptionFilter } from './exceptionFilters/exception-handler.filter';
import { ZodErrorFilter } from './exceptionFilters/zod-handler.filter';
import { SuccessResponseInterceptor } from './interceptors/success-response.interceptor';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  configDotenv();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  app.useGlobalFilters(
    new GlobalExceptionFilter(),
    new PrismaClientExceptionFilter(),
    new ZodErrorFilter(),
  );

  app.useGlobalInterceptors(new SuccessResponseInterceptor());

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  Logger.log(`Server running on ${process.env.MAIN_URL}`, 'Bootstrap');
}
bootstrap();
