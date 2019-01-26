import {
  Headers,
  Get,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
  Query,
  Param,
  Body,
  Head, UnauthorizedException, Req, Res, Session
} from '@nestjs/common';
import { AppService } from './app.service';
import {UsuarioService} from "./usuario/usuario.service";
import { ProductoService } from './producto/producto.service';

@Controller()
export class AppController {
  constructor(private readonly _appService: AppService,
              private readonly _usuarioService: UsuarioService,
              private readonly _productoService: ProductoService) {}

  @Get('login')
  mostrarLogin(
    @Res() res
  ) {
    res.render('login');
  }

  @Post('login')
  @HttpCode(200)
  async ejecutarLogin(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res() res,
    @Session() sesion
  ) {
    const respuesta = await this._usuarioService
      .autenticar(username, password);

    console.log(sesion);

    if (respuesta) {
      sesion.usuario = username;
      res.redirect('/producto/productoInicio');
    } else {
      res.redirect('login');
    }

  }

  @Get('logout')
  logout(
    @Res() res,
    @Session() sesion
  ) {
    sesion.username = undefined;
    sesion.destroy();
    res.redirect('login');
  }
}

export interface Usuario {
  nombre: string;
}

export interface Producto {
  idProd?: string;
  nombreProd: string;
  descripcionProd: string;
  precioC: number;
  precioV: number;
  stock: number;
}
