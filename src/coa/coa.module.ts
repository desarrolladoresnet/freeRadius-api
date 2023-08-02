import { Module } from '@nestjs/common';
import { CoaService } from './coa.service';
import { CoaController } from './coa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from 'src/userinfo/entities/userinfo.entity';
import { Radacct } from 'src/radacct/entities/radacct.entity';
import { Nas } from 'src/nas/entities/nas.entity';
import { RadUserGroup } from 'src/radusergroup/entities/radusergroup.entity';
import { RadusergroupService } from 'src/radusergroup/radusergroup.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo, Radacct, Nas, RadUserGroup])],
  providers: [CoaService, RadusergroupService],
  controllers: [CoaController],
  exports: [CoaService]
})
export class CoaModule {}