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

    // Crear usuario de ejemplo con email 'usuario@gmail.com' y password 'usuario123'
    const usuarioPassword = await bcrypt.hash('usuario123', 10);
    const usuario = this.usuariosRepository.create({
      nombre: 'Usuario Ejemplo',
      email: 'usuario@gmail.com',
      password: usuarioPassword,
      activo: true,
      telefono: '1234567890',
      direccion: 'Calle Principal 123',
    });

    await this.usuariosRepository.save(usuario);
    console.log('✓ Usuario creado: usuario@gmail.com / usuario123');

    console.log('Seed completado exitosamente.');
  }
}
