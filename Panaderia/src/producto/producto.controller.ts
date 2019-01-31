import { BadRequestException, Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import {Producto} from '../app.controller';
import {ProductoEntity} from './producto.entity';
import {ProductoService} from './producto.service';
import {FindManyOptions, Like} from 'typeorm';
import {CreateProductoDto} from './dto/create-producto.dto';
import { validate, ValidationError } from 'class-validator';

@Controller('producto')
export class ProductoController {
  constructor(private readonly _productoService: ProductoService){}

  @Get('productoInicio')
  async productoInicio(
    @Res() response,
    @Query('busqueda') busqueda: string,
    @Query('accion') accion: string,
    @Query('producto') producto: string,
  ){
    let mensaje = undefined;
    let clase = undefined;

    if (accion && producto) {
      switch (accion) {
        case 'borrar':
          mensaje = `Registro ${producto} eliminado`;
          clase = 'alert alert-danger';
          break;
        case 'actualizar':
          mensaje = `Registro ${producto} actualizado`;
          clase = 'alert alert-info';
          break;
        case 'crear':
          mensaje = `Registro ${producto} creado`;
          clase = 'alert alert-success';
          break;
      }
    }

    let productos: ProductoEntity[];
    if(busqueda){
      const consulta: FindManyOptions<ProductoEntity> ={
        where: [
          {
            nombreProd: Like(`%${busqueda}`)
          },
          {
            descripcionProd: Like(`%${busqueda}`)
          }
        ]
      };
      productos = await this._productoService.buscar(consulta);
    } else {
      productos = await this._productoService.buscar();
    }
    response.render(
      'productoInicio',
      {
        usuario:'web',
        arregloPro: productos,
        booleano: false,
        mensaje: mensaje,
        clase: clase
      }
    );
  }

  @Post('eliminar/:codProd')
  async eliminar(
    @Res() response,
    @Param('codProd') codProd: string,
  ) {
    const producto = await this._productoService.buscarPorId(codProd);
    await this._productoService.eliminar(codProd);
    const parametrosConsulta = `?accion=borrar%producto=${
        producto.nombreProd
      }`;
    response.redirect('/producto/productoInicio' + parametrosConsulta)
  }

  @Get('crear-producto')
  crearProductoRuta(
    @Res() response
  ) {
    response.render(
      'crear-producto'
    )
  }

  @Post('crear-producto')
  async crearProductoFuncion(
    @Res() response,
    @Body() producto: Producto
  ) {
    const objetoValidacionProducto = new CreateProductoDto();

    objetoValidacionProducto.codProd = producto.codProd;
    objetoValidacionProducto.nombreProd = producto.nombreProd;
    objetoValidacionProducto.stock = +producto.stock;
    objetoValidacionProducto.precioCompra = +producto.precioCompra;
    objetoValidacionProducto.precioVenta = +producto.precioVenta;

    const errores: ValidationError[] = await validate(
      objetoValidacionProducto);
    const hayErrores = errores.length>0;
    if (hayErrores){
      console.error(errores);
      throw new BadRequestException({mensaje: 'Error de validacion'})
    } else {
      const respuesta = await this._productoService.crear(producto);

      const parametrosConsulta = `?accion=crear%producto=${producto.nombreProd}`
      response.redirect(
        '/producto/productoInicio' + parametrosConsulta
      );
    }
  }

  @Get('actualizar-producto/:codProd')
  async actualizarParticipanteVista(
    @Res() response,
    @Param('codProd') codProd: string,
    ) {
    const productoEncontrado = await this._productoService
      .buscarPorId(codProd);
    response.render(
      'crear-producto',
      {
        producto: productoEncontrado
      }
    )
  }

  @Post('actualizar-producto/:codProd')
  async actualizarProductoMetodo(
    @Res() response,
    @Param('codProd') codProd: string,
    @Body() producto: Producto
  ) {
    producto.codProd = codProd;
    await this._productoService.actualizar(producto);
    const parametrosConsulta = `?accion=actualizar%producto=${producto.nombreProd}`

    response.redirect(
      '/producto/productoInicio' + parametrosConsulta
    );
  }

}