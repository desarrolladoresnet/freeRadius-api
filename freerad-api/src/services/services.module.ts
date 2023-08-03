import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { System } from 'src/database/system.entity';
import { Plan } from 'src/database/plan.entity';
import { Service } from '../database/service.entity';
import { PlanModule } from 'src/plan/plan.module';
import { PlanService } from 'src/plan/plan.service';
import { PlanController } from 'src/plan/plan.controller';
import { ZonaCliente } from 'src/database/node.entity';
import { SystemsModule } from 'src/systems/systems.module';
import { CoaModule } from 'src/coa/coa.module';
import { UserInfo } from 'src/database/user.entity';
import { RadUserGroup } from 'src/database/radusergroup.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      System,
      Plan,
      Service,
      UserInfo,
      RadUserGroup,
      ZonaCliente,
    ]),
    SystemsModule,
    CoaModule,
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
