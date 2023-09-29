import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemsModule } from 'src/systems/systems.module';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { CoaModule } from 'src/coa/coa.module';
//* ENTIDADES *//
import {
  Service,
  System,
  UserInfo,
  RadGroupReply,
  ZonaCliente,
  RadUserGroup,
} from '../database/entities/index';

/**
 * Modulo que reuno los principales datos de los servicios prestados a un cliente.
 * Principalmente el id de Wisphub y Radius.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([
      System,
      Service,
      UserInfo,
      RadUserGroup,
      RadGroupReply,
      ZonaCliente,
    ]),
    SystemsModule,
    CoaModule,
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
