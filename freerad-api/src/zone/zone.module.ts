import { Module } from '@nestjs/common';
import { ZoneController } from './zone.controller';
import { ZoneService } from './zone.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zone } from 'src/database/entities/zone.entity';
import { NasService } from 'src/nas/nas.service';
import { Nas } from 'src/database/entities/nas.entity';

/**
 * Esta tabla guarda todo lo reltaivo a las zonas que se relacionan a los servicios.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Zone, Nas])],
  controllers: [ZoneController],
  providers: [ZoneService, NasService],
})
export class ZoneModule {}
