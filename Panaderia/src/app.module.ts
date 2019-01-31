import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';

import {UsuarioEntity} from "./usuario/usuario.entity";
import {UsuarioModule} from "./usuario/usuario.module";
import {ProductoEntity} from './producto/producto.entity';
import {ProductoModule} from './producto/producto.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: '192.168.99.100',
        port: 32769,
        database: 'panaderia',
        username: 'web',
        password: 'asdf1234',
        synchronize: true,
        dropSchema: false,
        entities: [
          UsuarioEntity,
          ProductoEntity
        ]
      }
    ),
    UsuarioModule,
    ProductoModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})

export class AppModule {

}