import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { UserDto } from "./dto/users.dto";

@Injectable()
export class UsuarioService {
    private usuarios: Array<UserDto> = [{
        id: 1,
        entryDate: new Date(),
        email: 'carol@email.com',
        fullName: 'Caroline Barbosa Martins',
        userName: 'carol',
        password: '123'
    }];

    public criar(usuario: UserDto): UserDto {
        this.usuarios.push(usuario);

        return usuario;
    }

    public buscarPeloNome(nomeUsuario: string): UserDto {
        const buscaDeUsuario =  this.usuarios.find(
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