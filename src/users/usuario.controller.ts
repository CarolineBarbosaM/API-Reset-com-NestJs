import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post } from '@nestjs/common';
import { NestResponseBuilder } from '../core/http/nest-response-builder';
import { NestResponse } from '../core/http/nest.response';
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
    const usuarioEncontrado = this.usuarioService.buscarPeloNome(nomeDeUsuario)

    if(!usuarioEncontrado) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'usuario não encontrado.'
      })
    }

    return usuarioEncontrado
  }

  @Post()
  public criar(
    @Body() usuario: Usuario
  ): NestResponse {
    const usuarioCriado = this.usuarioService.criar(usuario);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({
        'Location': `/users/${usuarioCriado.nomeDeUsuario}`
      })
      .withBody(usuarioCriado)
      .build();
  }
}
