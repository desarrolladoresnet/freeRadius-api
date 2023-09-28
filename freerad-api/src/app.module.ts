/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
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
import { RadGroupReplyModule } from './radgroupreply/radgroupreply.module';
import { DatabaseModule } from './database/database.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
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
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
