import {Injectable} from '@nestjs/common';
import {Producto} from "../app.controller"
import {ProductoEntity} from './producto.entity';
import {FindManyOptions, Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class ProductoService {
  arregloPro: Producto[] = [
    {
      idProd: 'ASD123',
      nombreProd: 'Pan',
      descripcionProd: 'Pan horneado',
      precioC: 0.50,
      precioV: 0.55,
      stock: 10
    }
  ];

  constructor(
    @InjectRepository(ProductoEntity)
    private readonly _productoRepository: Repository<ProductoEntity>
  ) {}

  buscar(parametrosBusqueda?: FindManyOptions<ProductoEntity>)
    : Promise<ProductoEntity[]> {
    return this._productoRepository.find(parametrosBusqueda);
  }

  crear(producto: Producto): Promise<ProductoEntity> {
    const productoEntity : ProductoEntity = this._productoRepository
      .create(producto);
    return this._productoRepository.save(productoEntity);
  }

  /*eliminar(idProducto: string): Promise<ProductoEntity> {
    const productoEliminar: ProductoEntity = this._productoRepository
      .create({
        idProd: idProducto
      });
    return this._productoRepository.remove(productoEliminar);
  }*/

  actualizar(nuevoProducto: Producto) : Promise<ProductoEntity> {
    const productoEntity: ProductoEntity = this._productoRepository
      .create(nuevoProducto);
    return this._productoRepository.save(productoEntity);
  }

  buscarPorId(idProducto: string) : Promise<ProductoEntity>{
    return this._productoRepository.findOne(idProducto);
  }

}