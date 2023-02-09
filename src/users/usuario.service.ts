import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { UserDto } from "./dto/users.dto";

@Injectable()
export class UsuarioService {
    private usuarios: Array<UserDto> = [{
        id: 1,
        email: 'carol@email.com',
        fullName: 'Caroline Barbosa Martins',
        userName: 'carol',
        password: '123'
    }];

    public async criar(usuario: UserDto): Promise<UserDto> {
        await this.usuarios.push(usuario);

        return usuario;
    }

    public async buscarPeloNome(nomeUsuario: string): Promise<UserDto> {
        const buscaDeUsuario = await this.usuarios.find(
            usuario => usuario.userName == nomeUsuario
        )

        if(!buscaDeUsuario) {
            throw new NotFoundException({
              statusCode: HttpStatus.NOT_FOUND,
              message: 'usuario não encontrado.'
            })
          }
      

        return buscaDeUsuario
    }
}