import { Module } from '@nestjs/common';
import { NodesService } from './nodes.service';
import { NodesController } from './nodes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { System } from 'src/database/system.entity'
import { ZonaCliente } from '../database/node.entity';

/**
 * Los nodos son los puntos físico por donde se conectan los clientes al los servicios de Netcom.
 * La entidad de Nodos se modifico a ZonaClientes porque Radius ya posee una tabla 'node' con sus porpios valores.
 * Fue modificado como 'ZonaCliente' pero el modulo si se llama 'nodes'
 */
@Module({
  imports: [TypeOrmModule.forFeature([System, ZonaCliente])],
  controllers: [NodesController],
  providers: [NodesService]
})
export class NodesModule {}
