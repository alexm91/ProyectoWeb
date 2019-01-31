import {Injectable} from '@nestjs/common';
import {Producto} from "../app.controller"
import {ProductoEntity} from './producto.entity';
import {FindManyOptions, Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class ProductoService {
  arregloPro: Producto[] = [
    {
      codProd: 'ASD123',
      nombreProd: 'Pan',
      descripcionProd: 'Pan horneado',
      stock: 10,
      precioCompra: 0.50,
      precioVenta: 0.55
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

  eliminar(codProducto: string): Promise<ProductoEntity> {
    const productoEliminar: ProductoEntity = this._productoRepository
      .create({
        codProd: codProducto
      });
    return this._productoRepository.remove(productoEliminar);
  }

  actualizar(nuevoProducto: Producto) : Promise<ProductoEntity> {
    const productoEntity: ProductoEntity = this._productoRepository
      .create(nuevoProducto);
    return this._productoRepository.save(productoEntity);
  }

  buscarPorId(codProducto: string) : Promise<ProductoEntity>{
    return this._productoRepository.findOne(codProducto);
  }

}