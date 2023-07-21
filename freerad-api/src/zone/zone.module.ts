import { Module } from '@nestjs/common';
import { ZoneController } from './zone.controller';
import { ZoneService } from './zone.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zone } from 'src/database/zone.entity';
import { NasService } from 'src/nas/nas.service';
import { Nas } from 'src/database/nas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Zone, Nas])],
  controllers: [ZoneController],
  providers: [ZoneService, NasService],
})
export class ZoneModule {}
