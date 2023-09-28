import { Module } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { UserInfoController } from './user-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RadCheck } from 'src/database/entities/radcheck.entity';
import { RadUserGroup } from 'src/database/entities/radusergroup.entity';
import { UserInfo } from 'src/database/entities/userinfo.entity';
import { RadGroupReply } from 'src/database/entities/radgroupreply.entity';

/**
 * Modulo principal relativo a los usuarios de los servicios de NetcomPlus.
 * Los usuarios son manipulados para lograr efecto en 'Radius' y el router que este controla.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([UserInfo, RadCheck, RadUserGroup, RadGroupReply]),
  ],
  providers: [UserInfoService],
  controllers: [UserInfoController],
})
export class UserInfoModule {}
