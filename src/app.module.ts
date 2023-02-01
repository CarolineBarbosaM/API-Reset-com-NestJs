import { Module } from '@nestjs/common';
import { UsuarioController } from './usuarios/usuario.controller';

@Module({
  imports: [],
  controllers: [UsuarioController],
  providers: [],
})
export class AppModule {}
