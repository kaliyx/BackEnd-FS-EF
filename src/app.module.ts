import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database/database.config';
import { AuthModule } from './auth/auth.module';
import { ProductosModule } from './productos/productos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { VentasModule } from './ventas/ventas.module';
import { SeedService } from './database/seed.service';
import { ProductoSeedService } from './productos/producto-seed.service';
import { AuthMiddleware } from './auth/auth.middleware';
import { Usuario } from './usuarios/usuario.entity';
import { Producto } from './productos/producto.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Usuario, Producto]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'tu_clave_secreta_muy_segura_aqui',
      signOptions: { expiresIn: '7d' },
    }),
    AuthModule,
    ProductosModule,
    UsuariosModule,
    VentasModule,
  ],
  providers: [SeedService, ProductoSeedService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('api/*');
  }
}
