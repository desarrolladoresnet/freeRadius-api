import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { System } from 'src/systems/entities/system.entity'
import { Plan } from 'src/plan/entities/plan.entity'
import { Service } from './entities/service.entity';
import { PlanModule } from 'src/plan/plan.module';
import { PlanService } from 'src/plan/plan.service';
import { PlanController } from 'src/plan/plan.controller';
import { UserInfo } from 'src/userinfo/entities/userinfo.entity';
import { RadUserGroup } from 'src/radusergroup/entities/radusergroup.entity';
import { Node } from 'src/nodes/entities/node.entity';
import { SystemsModule } from 'src/systems/systems.module';
import { CoaModule } from 'src/coa/coa.module';

@Module({
  imports: [ TypeOrmModule.forFeature([ System, Plan, Service, UserInfo, RadUserGroup, Node ]), SystemsModule, CoaModule],
  controllers: [ServicesController],
  providers: [ ServicesService ]
})
export class ServicesModule {}
