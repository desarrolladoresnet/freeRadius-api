import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CoaService } from './coa.service';
import { CoaController } from './coa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from 'src/database/user.entity';
import { Radacct } from 'src/database/radacct.entity';
import { Nas } from 'src/database/nas.entity';
import { RadUserGroup } from 'src/database/radusergroup.entity';
import { RadusergroupService } from 'src/radusergroup/radusergroup.service';
import { RadGroupReply } from 'src/database/radgroupreply.entity';

/**
 * Modulo principal de la ruta 'coa'.
 * Los CoA son los comandos que permiten modificar ciertos parametros de los usuarios que acceden a los servicios de conexion a travez del servidor de Radius.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Nas,
      Radacct,
      RadGroupReply,
      RadUserGroup,
      UserInfo,
    ]),
  ],
  providers: [CoaService, RadusergroupService, ConfigService],
  controllers: [CoaController],
  exports: [CoaService]
})
export class CoaModule {}
