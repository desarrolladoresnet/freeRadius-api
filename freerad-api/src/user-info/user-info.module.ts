import { Module } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { UserInfoController } from './user-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RadCheck } from 'src/database/radcheck.entity';
import { RadUserGroup } from 'src/database/radusergroup.entity';
import { UserInfo } from 'src/database/user.entity';
import { RadGroupReply } from 'src/database/radgroupreply.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserInfo, RadCheck, RadUserGroup, RadGroupReply]),
  ],
  providers: [UserInfoService],
  controllers: [UserInfoController],
})
export class UserInfoModule {}
