import { BadRequestException } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe ({
    transform: true,
    exceptionFactory: (erros)=> new BadRequestException(erros)
  }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3000);
}
bootstrap();
