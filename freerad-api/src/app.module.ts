/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoaModule } from './coa/coa.module';
//* MODULOS *//
import { NasModule } from './nas/nas.module';
import { NodesModule } from './nodes/nodes.module';
import { PlanModule } from './plan/plan.module';
import { ServicesModule } from './services/services.module';
import { SystemsModule } from './systems/systems.module';
import { RadusergroupModule } from './radusergroup/radusergroup.module';
import { RadcheckModule } from './radcheck/radcheck.module';
import { UserInfoModule } from './user-info/user-info.module';
import { ZoneModule } from './zone/zone.module';
//* ENTIDADES *//
import { Nas } from './database/nas.entity';
import { RadCheck } from './database/radcheck.entity';
import { Radacct } from './database/radacct.entity';
import { Plan } from './database/plan.entity';
import { Service } from './database/service.entity';
import { System } from './database/system.entity';
import { RadUserGroup } from './database/radusergroup.entity';
import { UserInfo } from './database/user.entity';
import { ZonaCliente } from './database/node.entity';
import { Zone } from './database/zone.entity';
import { RadGroupReply } from './database/radgroupreply.entity';
import { RadGroupReplyModule } from './radgroupreply/radgroupreply.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development', '.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({

      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      // // username: 'radius',
      username: 'root',
      // // password: 'zh49cUPs8sQMvPgX',
      password: '7448280',
      database: 'radius',
      // database: 'radius',

      // type: 'mysql',
      // host: 'netcomplus.com.ve',
      // port: 3306,
      // username: 'urxlgocl8gt5k',
      // password: '24Nr^1$d##dg',
      // database: 'db8tlaoegfxlwz',
      entities: [
        Nas,
        Plan,
        Radacct,
        RadCheck,
        RadGroupReply,
        RadUserGroup,
        Service,
        System,
        UserInfo,
        ZonaCliente,
        Zone,
      ],
      synchronize: false, // Setear en 'false' cuando vaya a produccion
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
    NodesModule,
    RadGroupReplyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// eslint-disable-next-line prettier/prettier
export class AppModule {}
