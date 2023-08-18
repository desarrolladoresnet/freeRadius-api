import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemsModule } from 'src/systems/systems.module';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
//* ENTIDADES *//
import { Service } from '../database/entities/service.entity';
import { CoaModule } from 'src/coa/coa.module';
import { System } from 'src/database/entities/system.entity';
import { RadUserGroup } from 'src/database/entities/radusergroup.entity';
import { UserInfo } from 'src/database/entities/user.entity';
import { RadGroupReply } from 'src/database/entities/radgroupreply.entity';
import { ZonaCliente } from 'src/database/entities/node.entity';

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
