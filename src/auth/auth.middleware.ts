import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, _res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return next();
    }

    try {
      const decoded = this.jwtService.verify(token);
      (req as any).usuario = decoded;
    } catch (error) {
      // Token inválido/expirado: no bloquear rutas públicas
      // Continuar sin usuario; los endpoints protegidos validan presencia de usuario
    }

    next();
  }
}
