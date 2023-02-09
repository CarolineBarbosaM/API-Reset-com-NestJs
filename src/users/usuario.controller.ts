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
  public async criar(
    @Body() usuario: UserDto
  ): Promise<NestResponse> {
    const usuarioCriado = await this.usuarioService.criar(usuario);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({
        'Location': `/users/${usuarioCriado.userName}`
      })
      .withBody(usuarioCriado)
      .build();
  }

  @Get(':nome')
  public async buscarPeloNome(
    @Param('userName') nomeDeUsuario: string
  ): Promise<UserDto> {
    const usuarioEncontrado = await this.usuarioService.buscarPeloNome(nomeDeUsuario)

    return usuarioEncontrado
  }
  
}
