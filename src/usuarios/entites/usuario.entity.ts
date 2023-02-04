import { IsNotEmpty, IsDate, IsEmail, IsNumber, IsString } from "class-validator";
import { IsNomeDeUsuarioUnico } from "../validator/is-nome-de-usuario-unico.validator";

export class Usuario {
    @IsNumber()
    id: number;

    @IsNomeDeUsuarioUnico({
        message: 'O nome de usuário já existe'
    })
    @IsNotEmpty({
        message: 'Nome de usuário é obrigatório.'
    })
    @IsString({
        message: 'Nome do usuário precisa ser uma string.'
    })
    nomeDeUsuario: string;

    @IsEmail()
    email: string;

    @IsNotEmpty({
        message: 'Senha é obrogatório.'
    })
    senha: string;

    @IsNotEmpty({
        message: 'Nome completo é obrigatório.'
    })
    @IsString()
    nomeCompleto: string;

    @IsDate()
    dataDeEntrada: Date;
}