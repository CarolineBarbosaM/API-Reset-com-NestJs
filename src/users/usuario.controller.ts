import { Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NestResponseBuilder } from '../core/http/nest-response-builder';
import { NestResponse } from '../core/http/nest.response';
import { UserDto } from './dto/users.dto';
import { UsuarioService } from './usuario.service';

@ApiTags('Users')
@Controller('users')
export class UsuarioController {
  constructor(
    private usuarioService: UsuarioService
  ){}

  @Post()
  public criar(
    @Body() usuario: UserDto
  ): NestResponse {
    const usuarioCriado = this.usuarioService.criar(usuario);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({
        'Location': `/users/${usuarioCriado.userName}`
      })
      .withBody(usuarioCriado)
      .build();
  }

  @Get(':nome')
  public buscarPeloNome(
    @Param('userName') nomeDeUsuario: string
  ) {
    const usuarioEncontrado = this.usuarioService.buscarPeloNome(nomeDeUsuario)

    return usuarioEncontrado
  }
  
}
