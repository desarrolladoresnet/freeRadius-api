import { Module } from '@nestjs/common';
import { UserinfoService } from './userinfo.service';
import { UserinfoController } from './userinfo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RadCheck } from 'src/radcheck/entities/radcheck.entity';
import { RadUserGroup } from 'src/radusergroup/entities/radusergroup.entity';
import { UserInfo } from './entities/userinfo.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ RadCheck, RadUserGroup, UserInfo ])],
  controllers: [UserinfoController],
  providers: [UserinfoService]
})
export class UserinfoModule {}
