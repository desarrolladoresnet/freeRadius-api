import { Module } from '@nestjs/common';
import { RadcheckController } from './radcheck.controller';
import { RadcheckService } from './radcheck.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RadCheck } from 'src/database/radcheck.entity';

/**
 * El modulo de la tabla "radcheck".
 * Aquí van las credenciales de los usuarios. También se puede verificar información que venga en el Access-Request.
 */
@Module({
  imports: [TypeOrmModule.forFeature([RadCheck])],
  controllers: [RadcheckController],
  providers: [RadcheckService],
})
export class RadcheckModule {}
