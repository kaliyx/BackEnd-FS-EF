import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Producto } from '../productos/producto.entity';
import { Venta } from '../ventas/venta.entity';
import { DetalleVenta } from '../ventas/detalle-venta.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'better-sqlite3',
  database: 'tienda_ropa.db',
  entities: [Usuario, Producto, Venta, DetalleVenta],
  synchronize: true,
  logging: false,
};
