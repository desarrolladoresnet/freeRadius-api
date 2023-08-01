import { Module } from '@nestjs/common';
import { NasController } from './nas.controller';
import { NasService } from './nas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from 'src/database/user.entity';
import { Nas } from 'src/database/nas.entity';
import { Zone } from 'src/database/zone.entity';

/**
 * Modulo principal para interactuar con la tabla NAS.
 * Es posible que muchos de las rutas aqui implementadas no se vayan a usar, el modulo se construyo principalmente para generar los metodos de manipularan la tabla.
 */
@Module({
  imports: [TypeOrmModule.forFeature([UserInfo, Nas, Zone])],
  controllers: [NasController],
  providers: [NasService],
})
export class NasModule {}
