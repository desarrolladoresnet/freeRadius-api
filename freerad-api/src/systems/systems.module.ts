import { Module } from '@nestjs/common';
import { SystemsService } from './systems.service';
import { SystemsController } from './systems.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZonaCliente } from 'src/database/entities/node.entity';
import { System } from '../database/entities/system.entity';

/**
 * Es la información relativa a los sistema de gestión de clientes.
 */
@Module({
  imports: [TypeOrmModule.forFeature([ZonaCliente, System])],
  controllers: [SystemsController],
  providers: [SystemsService],
  exports: [SystemsService],
})
export class SystemsModule {}
