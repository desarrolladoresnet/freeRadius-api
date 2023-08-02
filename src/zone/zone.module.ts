import { Module } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { ZoneController } from './zone.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nas } from 'src/nas/entities/nas.entity';
import { Zone } from './entities/zone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Nas, Zone ])],
  controllers: [ZoneController],
  providers: [ZoneService]
})
export class ZoneModule {}
