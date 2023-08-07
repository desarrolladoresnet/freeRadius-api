import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemsModule } from 'src/systems/systems.module';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
//* ENTIDADES *//
import { Plan } from 'src/database/plan.entity';
import { Service } from '../database/service.entity';
import { ZonaCliente } from 'src/database/node.entity';
import { CoaModule } from 'src/coa/coa.module';
import { System } from 'src/database/system.entity';
import { RadUserGroup } from 'src/database/radusergroup.entity';
import { UserInfo } from 'src/database/user.entity';

/**
 * Modulo que reuno los principales datos de los servicios prestados a un cliente.
 * Principalmente el id de Wisphub y Radius.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([
      System,
      Plan,
      Service,
      UserInfo,
      RadUserGroup,
      ZonaCliente,
    ]),
    SystemsModule,
    CoaModule,
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
