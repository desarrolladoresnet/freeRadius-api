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
import { RadGroupReplyModule } from './radgroupreply/radgroupreply.module';


@Module({
  imports: [SystemsModule, ServicesModule, PlanModule, NodesModule, NasModule, RadacctModule, RadcheckModule, RadusergroupModule, UserinfoModule, ZoneModule,RadGroupReplyModule,
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
