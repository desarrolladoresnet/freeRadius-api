import { Module } from '@nestjs/common';
import { SystemsService } from './systems.service';
import { SystemsController } from './systems.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZonaCliente } from 'src/database/node.entity';
import { System } from '../database/system.entity';

/**
 * Es la informacion relativa a los sistema de gestion de clientes.
 */
@Module({
  imports: [TypeOrmModule.forFeature([ZonaCliente, System])],
  controllers: [SystemsController],
  providers: [SystemsService],
  exports: [SystemsService],
})
export class SystemsModule {}
