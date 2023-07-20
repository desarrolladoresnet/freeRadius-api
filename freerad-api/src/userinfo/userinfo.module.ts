import { Module } from '@nestjs/common';
import { UserInfoService } from './userinfo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserinfoController } from './userinfo.controller';
import { UserInfo } from 'src/database/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo])],
  controllers: [UserinfoController],
  providers: [UserInfoService],
})
export class UserinfoModule {}
