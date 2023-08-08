/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { NodesService } from './nodes.service';
import { CreateNodeDto } from '../database/create-node.dto';
// import { UpdateNodeDto } from './dto/update-node.dto';
import { UpdateNodeDto } from 'src/database/update-node.dto';

/**
 * Los nodos son los puntos físicos por donde se conectan los clientes al los servicios de Netcom.
 * La entidad de Nodos se modifico a ZonaClientes porque Radius ya posee una tabla 'node' con sus porpios valores.
 * Fue modificado como 'ZonaCliente' pero el modulo si se llama 'nodes'
 */
@Controller('nodes')
export class NodesController {
  constructor(private readonly nodesService: NodesService) {}

  /**
   * Permite crear una nueva entrada en la tabla.
   * @param data { CreateNodeDto }
   * @returns { object }
   */
  @Post()
  async createNodo(@Body() data: CreateNodeDto) {
    return await this.nodesService.CreateNodo(data);
  }

  /**
   * Busca todas las entradas en la tabla.
   * @returns { Array }
   */
  @Get()
  findAllNodes() {
    return this.nodesService.FindAllNodes();
  }

  /**
   * Obtiene una entrada mediante el id.
   * @param id  { number }
   * @returns { object }
   */
  @Get(':id')
  findOneNode(@Param('id') id: number) {
    return this.nodesService.FindOneNode(id);
  }

  /**
   * Actualiza la entrada en en ZonaCliente.
   * Si no hay valores 
   * @param id { number }
   * @param data { UpdateNodeDto } 
   */
  @Put(':id')
  updateNode(@Param('id') id: number, @Body() data: UpdateNodeDto) {
    return this.nodesService.UpdateNode(id, data);
  }

  /**
   * Elimina una entrada de la tabla mediante el id.
   * @param id { number }
   * @returns { object }
   */
  @Delete(':id')
  removeNode(@Param('id') id: number) {
    return this.nodesService.RemoveNode(id);
  }
}
