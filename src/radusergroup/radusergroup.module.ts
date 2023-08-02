import { Module } from '@nestjs/common';
import { RadusergroupService } from './radusergroup.service';
import { RadusergroupController } from './radusergroup.controller';
import { RadUserGroup } from './entities/radusergroup.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RadUserGroup])],
  controllers: [RadusergroupController],
  providers: [RadusergroupService]
})
export class RadusergroupModule {}
