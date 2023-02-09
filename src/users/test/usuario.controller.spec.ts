import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import { UsuarioController } from "../usuario.controller"
import { UsuarioService } from "../usuario.service"
import { IsNomeDeUsuarioUnicoConstraint } from "../validator/is-nome-de-usuario-unico.validator"
import { returnUser, userDTO } from "./mock/mock-user-test"


describe('User Controller Test', () => {
  let app: INestApplication
  let usuarioController: UsuarioController
  let usuarioService: UsuarioService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [
        UsuarioService,
        IsNomeDeUsuarioUnicoConstraint,
      ],
    }).compile()

    app = module.createNestApplication()
    app.useGlobalPipes(new ValidationPipe())
    await app.init()

    usuarioService = module.get<UsuarioService>(
        UsuarioService,
    )

    usuarioController = module.get<UsuarioController>(
        UsuarioController,
    )
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  afterAll(() => {
    app.close()
  })

  it('should be defined', () => {
    expect(usuarioService).toBeDefined()
  })

  it('should create new user', async () => {
    const newUser = jest
      .spyOn(usuarioService, 'criar')
      .mockResolvedValue(userDTO)

    const result = await usuarioController.criar(
    userDTO,
    )  

    expect(result).toEqual(returnUser)
    expect(result.status).toEqual(HttpStatus.CREATED)
    expect(newUser).toHaveBeenCalled()
  })

  it('should get user', async () => {
    const newUser = jest
      .spyOn(usuarioService, 'buscarPeloNome')
      .mockResolvedValue(userDTO)

    const result = await usuarioController.buscarPeloNome(
    userDTO.userName,
    )  

    expect(result).toEqual(userDTO)
    expect(newUser).toHaveBeenCalled()
  })
})
