import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Producto } from '../productos/producto.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'better-sqlite3',
  database: 'tienda_ropa.db',
  entities: [Usuario, Producto],
  synchronize: true,
  logging: false,
};
