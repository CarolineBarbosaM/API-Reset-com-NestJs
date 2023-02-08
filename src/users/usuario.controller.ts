import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Usuario } from './entites/usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('users')
export class UsuarioController {
  constructor(
    private usuarioService: UsuarioService
  ){}

  @Get(':nome')
  public buscarPeloNome(
    @Param('userName') nomeDeUsuario: string
  ) {
    return this.usuarioService.buscarPeloNome(nomeDeUsuario)
  }

  @Post()
  public criar(
    @Body() usuario: Usuario
  ) {
    return this.usuarioService.criar(usuario);
  }
}
