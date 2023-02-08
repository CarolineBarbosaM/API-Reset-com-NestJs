import { Module } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { FiltroDeExececaoHttp } from './common/filter/filtro-de-exececao-http.filter';
import { UsuarioModule } from './users/usuario.module';

@Module({
  imports: [UsuarioModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FiltroDeExececaoHttp
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    }
  ],
})
export class AppModule {}
