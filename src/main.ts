import { BadRequestException } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('User management')
    .setDescription('User management API description')
    .setVersion('1.0')
    .addTag('Usuários')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe ({
    transform: true,
    exceptionFactory: (erros)=> new BadRequestException(erros)
  }));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3000);

}
bootstrap();
