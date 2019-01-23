import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindOneOptions, Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";

@Injectable()
export class UsuarioService {

  // Inyectar las dependencias
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly _usuarioRepository:
      Repository<UsuarioEntity>
  ) {
  }

  async autenticar(username: string,
                   password: string): Promise<boolean> {
    // Password encriptada
    // Encriptar el passwrod que les llega

    const consulta: FindOneOptions<UsuarioEntity> = {
      where: {
        username: username,
        password: password // password encriptado
      }
    };

    const respuesta = await this._usuarioRepository.findOne(consulta);

    if (respuesta) {
      return true;
    } else {
      return false;
    }

  }

}