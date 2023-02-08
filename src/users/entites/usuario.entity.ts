import { Exclude } from "class-transformer";
import { Expose } from "class-transformer/decorators";
import { IsNotEmpty, IsDate, IsEmail, IsNumber, IsString, IsOptional } from "class-validator";
import { IsNomeDeUsuarioUnico } from "../validator/is-nome-de-usuario-unico.validator";

export class Usuario {
    @IsNumber()
    id: number;

    @Expose({ name: 'userName' })
    @IsNomeDeUsuarioUnico({ message: 'O nome de usuário já existe' })
    @IsNotEmpty({ message: 'Nome de usuário é obrigatório.' })
    @IsString({ message: 'Nome do usuário precisa ser uma string.'})
    nomeDeUsuario: string;

    @IsEmail()
    email: string;

    @Expose({ name: 'password' })
    @Exclude({ toPlainOnly: true })
    @IsNotEmpty({ message: 'Senha é obrogatório.' })
    senha: string;

    @Expose({ name: 'fullName' })
    @IsNotEmpty({ message: 'Nome completo é obrigatório.'})
    @IsString()
    nomeCompleto: string;

    @Expose({ name: 'entryDate' })
    @IsDate()
    @IsOptional()
    dataDeEntrada: Date;
}