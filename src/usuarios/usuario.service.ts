import { Injectable } from "@nestjs/common";
import { Usuario } from "./entites/usuario.entity";

@Injectable()
export class UsuarioService {
    private usuarios: Array<Usuario> = [{
        id: 1,
        dataDeEntrada: new Date(),
        email: 'carol@email.com',
        nomeCompleto: 'Caroline Barbosa Martins',
        nomeDeUsuario: 'carol',
        senha: '123'
    }];

    public buscarPeloNome(nomeUsuario: string): Usuario {
        const buscaDeUsuario =  this.usuarios.find(
            usuario => usuario.nomeDeUsuario == nomeUsuario
        )

        return buscaDeUsuario
    }

    public criar(usuario: Usuario): Usuario {
        this.usuarios.push(usuario);

        return usuario;
    }
}