import { ApiProperty } from "@nestjs/swagger"

export class UserDto {

    @ApiProperty({
        example: '1',
        description: `Esse será o id de identificação`,
    })
    id: number

    @ApiProperty({
        example: 'Joe Listen',
        description: `Esse será o nome de usuário`,
    })
    userName: string
  
    @ApiProperty({
        example: 'joelisten@email.com',
        description: `Esse será o email do usuário`,
    })
    email: string
  
    @ApiProperty({
        example: '123456',
        description: `Essa será a senha do usuário`,
    })
    password: string

    @ApiProperty({
        example: '123456',
        description: `Esse é o nome completo do usuário`,
    })
    fullName: string

    @ApiProperty({
        example: new Date(),
        description: `Essa é a data de entrada do usuário`,
    })
    entryDate: Date
  }