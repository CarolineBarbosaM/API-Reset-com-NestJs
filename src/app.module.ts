import { Module } from '@nestjs/common';
import { UsuarioModule } from './users/usuario.module';
import { UsuarioService } from './users/usuario.service';
import { IsNomeDeUsuarioUnicoConstraint } from './users/validator/is-nome-de-usuario-unico.validator';

@Module({
  imports: [UsuarioModule],
  controllers: [],
  providers: [
    UsuarioService,
    IsNomeDeUsuarioUnicoConstraint
  ],
})
export class AppModule {}
