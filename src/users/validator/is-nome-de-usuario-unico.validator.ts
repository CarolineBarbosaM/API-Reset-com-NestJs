import { Injectable } from "@nestjs/common";
import { UsuarioService } from "../usuario.service";

import { 
  ValidationOptions, 
  registerDecorator, 
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface 
} from "class-validator";

@Injectable()
@ValidatorConstraint({ async: true })
export class IsNomeDeUsuarioUnicoConstraint implements ValidatorConstraintInterface {
    constructor(private usuarioService: UsuarioService) {}

    validate(nomeDeUsuario: string, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        return !!!this.usuarioService.buscarPeloNome(nomeDeUsuario)
    }
}

export function IsNomeDeUsuarioUnico(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsNomeDeUsuarioUnicoConstraint,
      });
    };
  }