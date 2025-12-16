import { IsString, MinLength, IsEmail, Matches } from 'class-validator';

export class RegistroDto {
  @IsString({ message: 'El nombre debe ser un texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  nombre: string;

  @IsEmail({}, { message: 'El email no es válido' })
  @Matches(/@gmail\.com$/i, { message: 'El email debe terminar en @gmail.com' })
  email: string;

  @IsString({ message: 'La contraseña debe ser un texto' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsString({ message: 'El teléfono es obligatorio' })
  @MinLength(7, { message: 'El teléfono debe tener al menos 7 dígitos' })
  telefono: string;

  @IsString({ message: 'La dirección es obligatoria' })
  @MinLength(5, { message: 'La dirección debe tener al menos 5 caracteres' })
  direccion: string;
}

export class LoginDto {
  @IsEmail({}, { message: 'El email no es válido' })
  @Matches(/@gmail\.com$/i, { message: 'El email debe terminar en @gmail.com' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}
