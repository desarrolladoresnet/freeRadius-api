import { Module } from '@nestjs/common';
import { RadiusService } from './radius.service';
import { RadiusController } from './radius.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from 'src/database/user.entity';
import { NasService } from './nas.service';
import { Nas } from 'src/database/nas.entity';
import { ZoneService } from './zone.service';
import { Zone } from 'src/database/zone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo, Nas, Zone])],
  providers: [RadiusService, NasService, ZoneService],
  controllers: [RadiusController],
})
export class RadiusModule {}
