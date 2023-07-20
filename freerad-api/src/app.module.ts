import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RadiusModule } from './radius/radius.module';
import { UserInfo } from './database/user.entity';
import { Nas } from './database/nas.entity';
import { Zone } from './database/zone.entity';
import { CoaController } from './coa/coa.controller';
import { CoaService } from './coa/coa.service';
import { CoaModule } from './coa/coa.module';
import { RadusergroupModule } from './radusergroup/radusergroup.module';
import { RadcheckModule } from './radcheck/radcheck.module';
import { UserinfoController } from './userinfo/userinfo.controller';
import { UserinfoModule } from './userinfo/userinfo.module';
import { ZoneModule } from './zone/zone.module';
import { NasModule } from './nas/nas.module';
import { RadCheck } from './database/radcheck.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '7448280',
      database: 'nest',
      entities: [UserInfo, Nas, Zone, RadCheck],
      synchronize: false, // Setear en 'false' cuando vaya a produccion
    }),
    RadiusModule,
    CoaModule,
    RadusergroupModule,
    RadcheckModule,
    UserinfoModule,
    ZoneModule,
    NasModule,
  ],
  controllers: [AppController, CoaController, UserinfoController],
  providers: [AppService, CoaService],
})
export class AppModule {}
