import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  private logFilePath: string;

  constructor() {
    // Ruta del archivo de logs
    this.logFilePath = path.join(__dirname, '../../logs.txt'); // Ajusta la ruta según la ubicación de tu archivo
  }

  use(req: Request, res: Response, next: NextFunction) {
    // Guarda el mensaje de log en el archivo de logs
    const logMessage = `${new Date().toLocaleString()}: ${JSON.stringify(
      req.body,
    )}\n`;
    fs.appendFileSync(this.logFilePath, logMessage);

    // Continúa con el flujo de la solicitud
    next();
  }
}
