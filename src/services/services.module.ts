import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { System } from 'src/systems/entities/system.entity'
import { Service } from './entities/service.entity';
import { UserInfo } from 'src/userinfo/entities/userinfo.entity';
import { RadUserGroup } from 'src/radusergroup/entities/radusergroup.entity';
import { Node } from 'src/nodes/entities/node.entity';
import { SystemsModule } from 'src/systems/systems.module';
import { CoaModule } from 'src/coa/coa.module';
import { RadGroupReply } from 'src/radgroupreply/entities/radgroupreply.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ System, Service, UserInfo, RadUserGroup, Node, RadGroupReply ]), SystemsModule, CoaModule],
  controllers: [ServicesController],
  providers: [ ServicesService ]
})
export class ServicesModule {}
