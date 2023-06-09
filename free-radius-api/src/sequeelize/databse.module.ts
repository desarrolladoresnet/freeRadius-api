/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

/**
 * Modulo del proveedor de la base de datos para la API.
 * El ORM es Sequelize.
 */
@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
