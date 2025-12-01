import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  async seed() {
    // Verificar si ya existen usuarios
    const usuariosCount = await this.usuariosRepository.count();

    if (usuariosCount > 0) {
      console.log('Base de datos ya contiene usuarios. Seed omitido.');
      return;
    }

    console.log('Iniciando seed de datos...');

    // Crear usuarios admin
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = this.usuariosRepository.create({
      nombre: 'Administrador',
      email: 'admin@tienda.com',
      password: adminPassword,
      rol: 'admin',
      activo: true,
      telefono: '1234567890',
      direccion: 'Calle Principal 123',
    });

    await this.usuariosRepository.save(admin);
    console.log('✓ Admin creado: admin@tienda.com / admin123');

    // Crear vendedores de ejemplo
    const vendedores = [
      {
        nombre: 'Juan Pérez',
        email: 'juan@tienda.com',
        password: 'vendor123',
      },
      {
        nombre: 'María García',
        email: 'maria@tienda.com',
        password: 'vendor123',
      },
      {
        nombre: 'Carlos López',
        email: 'carlos@tienda.com',
        password: 'vendor123',
      },
    ];

    for (const vendedorData of vendedores) {
      const hashedPassword = await bcrypt.hash(vendedorData.password, 10);
      const vendedor = this.usuariosRepository.create({
        nombre: vendedorData.nombre,
        email: vendedorData.email,
        password: hashedPassword,
        rol: 'vendedor',
        activo: true,
        telefono: '1234567890',
        direccion: 'Tienda - ' + vendedorData.nombre,
      });

      await this.usuariosRepository.save(vendedor);
      console.log(`✓ Vendedor creado: ${vendedorData.email} / ${vendedorData.password}`);
    }

    console.log('Seed completado exitosamente.');
  }
}
