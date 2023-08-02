import { Module } from '@nestjs/common';
import { NasService } from './nas.service';
import { NasController } from './nas.controller';
import { Nas } from './entities/nas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from 'src/userinfo/entities/userinfo.entity';
import { Zone } from 'src/zone/entities/zone.entity';


/**
 * Modulo principal para interactuar con la tabla NAS.
 * Es posible que muchos de las rutas aqui implementadas no se vayan a usar, el modulo se construyo principalmente para generar los metodos de manipularan la tabla.
 */
@Module({
  imports: [TypeOrmModule.forFeature([UserInfo, Zone, Nas])],
  controllers: [NasController],
  providers: [NasService],
})
export class NasModule {}