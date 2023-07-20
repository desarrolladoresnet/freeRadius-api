import { Module } from '@nestjs/common';
import { RadusergroupController } from './radusergroup.controller';
import { RadusergroupService } from './radusergroup.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [RadusergroupController],
  providers: [RadusergroupService],
})
export class RadusergroupModule {}
