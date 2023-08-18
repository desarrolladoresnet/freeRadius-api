import { Module } from '@nestjs/common';
import { RadcheckController } from './radcheck.controller';
import { RadcheckService } from './radcheck.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RadCheck } from 'src/database/entities/radcheck.entity';

/**
 * El modulo de la tabla "radcheck".
 * Información de autenticación de los  servicios: 
 * credenciales (serial) y tipo de tecnología (Framed-Protocol).
 */
@Module({
  imports: [TypeOrmModule.forFeature([RadCheck])],
  controllers: [RadcheckController],
  providers: [RadcheckService],
})
export class RadcheckModule {}
