import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemsModule } from 'src/systems/systems.module';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
//* ENTIDADES *//
import { Service } from '../database/service.entity';
import { CoaModule } from 'src/coa/coa.module';
import { System } from 'src/database/system.entity';
import { RadUserGroup } from 'src/database/radusergroup.entity';
import { UserInfo } from 'src/database/user.entity';
import { RadGroupReply } from 'src/database/radgroupreply.entity';
import { ZonaCliente } from 'src/database/node.entity';

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
      ZonaCliente
    ]),
    SystemsModule,
    CoaModule,
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
