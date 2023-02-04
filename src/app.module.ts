import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuarios/usuario.module';
import { UsuarioService } from './usuarios/usuario.service';
import { IsNomeDeUsuarioUnicoConstraint } from './usuarios/validator/is-nome-de-usuario-unico.validator';

@Module({
  imports: [UsuarioModule],
  controllers: [],
  providers: [
    UsuarioService,
    IsNomeDeUsuarioUnicoConstraint
  ],
})
export class AppModule {}
