/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

/**
 * Este servicio solo se uso para poder traer los modelos desde la BD, pero dado la naturaleza de MariaDB y de la poca compatibilidad de prisma, se adapto para usar sequelize.
 */
@Injectable()
export class PrismaService extends PrismaClient {
  /**
   * Conexion a la base de datos por medio de una url.
   * @param { ConfigService } config 
   */
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
}