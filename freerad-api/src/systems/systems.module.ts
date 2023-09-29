import { Module } from '@nestjs/common';
import { SystemsService } from './systems.service';
import { SystemsController } from './systems.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZonaCliente, System } from 'src/database/entities/index';

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
