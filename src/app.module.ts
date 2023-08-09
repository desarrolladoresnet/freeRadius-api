import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SystemsModule } from './systems/systems.module';
import { ServicesModule } from './services/services.module';
import { PlanModule } from './plan/plan.module';
import { NodesModule } from './nodes/nodes.module';
import { NasModule } from './nas/nas.module';
import { RadacctModule } from './radacct/radacct.module';
import { RadcheckModule } from './radcheck/radcheck.module';
import { RadusergroupModule } from './radusergroup/radusergroup.module';
import { UserinfoModule } from './userinfo/userinfo.module';
import { ZoneModule } from './zone/zone.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { System } from './systems/entities/system.entity';
import { Nas } from './nas/entities/nas.entity';
import { Plan } from './plan/entities/plan.entity';
import { Radacct } from './radacct/entities/radacct.entity';
import { RadCheck } from './radcheck/entities/radcheck.entity';
import { RadUserGroup } from './radusergroup/entities/radusergroup.entity';
import { Service } from './services/entities/service.entity';
import { UserInfo } from './userinfo/entities/userinfo.entity';
import { Zone } from './zone/entities/zone.entity';
import { Node } from './nodes/entities/node.entity';
import { NasController } from './nas/nas.controller';
import { NasService } from './nas/nas.service';
import { NodesController } from './nodes/nodes.controller';
import { NodesService } from './nodes/nodes.service';
import { PlanController } from './plan/plan.controller';
import { PlanService } from './plan/plan.service';
import { RadacctController } from './radacct/radacct.controller';
import { RadacctService } from './radacct/radacct.service';
import { RadusergroupController } from './radusergroup/radusergroup.controller';
import { RadusergroupService } from './radusergroup/radusergroup.service';
import { ServicesController } from './services/services.controller';
import { ServicesService } from './services/services.service';
import { UserinfoController } from './userinfo/userinfo.controller';
import { UserinfoService } from './userinfo/userinfo.service';
import { ZoneController } from './zone/zone.controller';
import { ZoneService } from './zone/zone.service';


@Module({
  imports: [SystemsModule, ServicesModule, PlanModule, NodesModule, NasModule, RadacctModule, RadcheckModule, RadusergroupModule, UserinfoModule, ZoneModule,
    TypeOrmModule.forRoot({
      type :"sqlite",
      database: "radius",
      //type: 'mysql',
      //host: 'netcomplus.com.ve',
      //port: 3306,
      //username: 'urxlgocl8gt5k',
      //password: '24Nr^1$d##dg',
      //database: 'db8tlaoegfxlwz',
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      //entities: [ Nas, Node, Plan, Radacct, RadCheck, RadUserGroup, Service, System, UserInfo, Zone],
      synchronize: true,
    })],
  controllers: [AppController],//, NasController, NodesController, PlanController, RadacctController, RadusergroupController, ServicesController, UserinfoController, ZoneController],
  providers: [AppService]//, NasService, NodesService, PlanService, RadacctService, RadusergroupService, ServicesService, UserinfoService, ZoneService],
})
export class AppModule {}
