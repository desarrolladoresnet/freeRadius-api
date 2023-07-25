import { Module } from '@nestjs/common';
import { RadusergroupController } from './radusergroup.controller';
import { RadusergroupService } from './radusergroup.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RadUserGroup } from 'src/database/radusergroup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RadUserGroup])],
  controllers: [RadusergroupController],
  providers: [RadusergroupService],
})
export class RadusergroupModule {}
