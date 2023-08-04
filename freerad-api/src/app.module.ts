import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserInfo } from './database/user.entity';
import { Nas } from './database/nas.entity';
import { Zone } from './database/zone.entity';
import { CoaModule } from './coa/coa.module';
import { RadusergroupModule } from './radusergroup/radusergroup.module';
import { RadcheckModule } from './radcheck/radcheck.module';
import { ZoneModule } from './zone/zone.module';
import { NasModule } from './nas/nas.module';
import { RadCheck } from './database/radcheck.entity';
import { RadUserGroup } from './database/radusergroup.entity';
import { UserInfoModule } from './user-info/user-info.module';
import { Radacct } from './database/radacct.entity';
import { PlanModule } from './plan/plan.module';
import { NodesModule } from './nodes/nodes.module';
import { SystemsModule } from './systems/systems.module';
import { Plan } from './database/plan.entity';
import { System } from './database/system.entity';
import { ZonaCliente } from './database/node.entity';
import { ServicesModule } from './services/services.module';
import { Service } from './database/service.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      /*
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      // username: 'radius',
      username: 'root',
      // password: 'zh49cUPs8sQMvPgX',
      password: '7448280',
      // database: 'radius',
      database: 'radius',
      */
      type: 'mysql',
      host: 'netcomplus.com.ve',
      port: 3306,
      username: 'urxlgocl8gt5k',
      password: '24Nr^1$d##dg',
      database: 'db8tlaoegfxlwz',
      entities: [
        Nas,
        RadCheck,
        RadUserGroup,
        UserInfo,
        Zone,
        Radacct,
        Plan,
        System,
        ZonaCliente,
        Service,
        UserInfo
      ],
      synchronize: true, // Setear en 'false' cuando vaya a produccion
    }),
    CoaModule,
    NasModule,
    NodesModule,
    PlanModule,
    RadusergroupModule,
    RadcheckModule,
    SystemsModule,
    UserInfoModule,
    ZoneModule,
    ServicesModule,
    NodesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
