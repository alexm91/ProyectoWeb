import { Column, Entity, Index, PrimaryColumn} from 'typeorm';

@Entity('producto')
export class ProductoEntity {

  @PrimaryColumn({
    name: 'codigo_producto',
    type: 'varchar',
    length: 6
  })
  codProd: string;

  @Index()
  @Column({
    name: 'nombre_producto',
    type: 'varchar',
    length: 30
  })
  nombreProd: string;

  @Column({
    name: 'descripcion_producto',
    type: 'varchar',
    length: 50,
  })
  descripcionProd: string;

  @Column({
    name: 'stock',
    type: 'int',
  })
  stock: number;

  @Column({
    name: 'precio_compra',
    type: 'double',
  })
  precioCompra: number;

  @Column({
    name: 'precio_venta',
    type: 'double',
  })
  precioVenta: number;

}

