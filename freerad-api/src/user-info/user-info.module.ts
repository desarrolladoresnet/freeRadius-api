import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfoService } from './user-info.service';
import { UserInfoController } from './user-info.controller';
import {
  RadCheck,
  RadUserGroup,
  RadGroupReply,
  UserInfo,
} from 'src/database/entities/index';

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
