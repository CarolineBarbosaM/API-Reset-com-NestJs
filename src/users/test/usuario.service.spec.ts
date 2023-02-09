import { Test, TestingModule } from "@nestjs/testing"
import { UsuarioService } from "../usuario.service"
import { IsNomeDeUsuarioUnicoConstraint } from "../validator/is-nome-de-usuario-unico.validator"
import { userDTO } from "./mock/mock-user-test"


describe('User Service Test', () => {
  let usuarioService: UsuarioService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        IsNomeDeUsuarioUnicoConstraint,
      ],
    }).compile()

    usuarioService = module.get<UsuarioService>(
        UsuarioService,
    )
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should be defined', () => {
    expect(usuarioService).toBeDefined()
  })

  it('should create new user', async () => {

    jest
      .spyOn(usuarioService, 'criar')
      .mockResolvedValue(userDTO)

    const result = await usuarioService.criar(
        userDTO,
    )  

    expect(result).toEqual(userDTO)
  })

  it('should get user', async () => {
    const newUser = jest
      .spyOn(usuarioService, 'buscarPeloNome')
      .mockResolvedValue(userDTO)

    const result = await usuarioService.buscarPeloNome(
    userDTO.userName,
    )  

    expect(result).toEqual(userDTO)
    expect(newUser).toHaveBeenCalled()
  })
})
