import { Module } from '@nestjs/common';
import { RadiusService } from './radius.service';
import { RadiusController } from './radius.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from 'src/userinfo/entities/userinfo.entity';
import { Nas } from 'src/nas/entities/nas.entity';
import { NasService } from './nas.service';
import { Zone } from 'src/zone/entities/zone.entity';
import { ZoneService } from './zone.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo, Nas, Zone])],
  providers: [RadiusService, NasService, ZoneService],
  controllers: [RadiusController],
})
export class RadiusModule {}