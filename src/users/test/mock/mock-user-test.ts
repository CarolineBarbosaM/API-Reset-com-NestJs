import { NestResponse } from "../../../core/http/nest.response";
import { UserDto } from "../../dto/users.dto";

export const userDTO: UserDto = {
    id: 1,
    userName: "Teste",
    email: "teste@teste.com",
    password: "123456",
    fullName: "Teste Unitário",
}

export const returnUser: NestResponse = {
    status: 201,
    headers: {
        'Location': `/users/${userDTO.userName}`
    },
    body: userDTO
}