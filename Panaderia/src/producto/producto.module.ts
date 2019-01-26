import {Module} from '@nestjs/common';
import { ProductoEntity } from './producto.entity';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module(
  {
    imports: [
      TypeOrmModule
        .forFeature(
          [
            ProductoEntity
          ])
    ],
    controllers: [
      ProductoController
    ],
    providers: [
      ProductoService
    ],
    exports: [
      ProductoService
    ]
  }
)
export class ProductoModule {

}