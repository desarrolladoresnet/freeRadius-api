/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { SystemsService } from './systems.service';
import { CreateSystemDto } from '../dto/create-system.dto';
import { UpdateSystemDto } from 'src/dto/update-system.dto';

/**
 * Es la informacion relativa a los sistema de gestion de clientes.
 */
@Controller('systems')
export class SystemsController {
  constructor(private readonly sysService: SystemsService) {}

  /**
   * Creacion de entradas. Todos los campos son obligatorios (name, apiKey, endPoint).
   * @param data { createSysDto }
   * @returns { object }
   */
  @Post()
  async createSys(@Body() data: CreateSystemDto) {
    return await this.sysService.CreateSys(data);
  }

  /**
   * Busca todas la entradas.
   * @todo paginar
   * @returns { Array }
   */
  @Get()
  findAll() {
    return this.sysService.FindAllSys();
  }

  /**
   * Busca una entrada en 'System' por Id.
   * @param id { number } 
   * @returns { object }
   */
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.sysService.FindOneSys(id);
  }

  /**
   * Permite modificar una entrada mendiante us id.
   * Si todos los parametros están vacíos, la operación es rechazada.
   * @param id 
   * @param updateSysDto 
   * @returns { object }
   */
  @Put(':id')
  update(@Param('id') id: number, @Body() updateSysDto: UpdateSystemDto) {
    return this.sysService.UpdateSys(id, updateSysDto);
  }

  /**
   * Buscas todos los servicios en el sistema.
   * @param id { number }
   * @param node { string }
   * @returns { object }
   */
  @Get(':id/:node')
  async sysNode(@Param('id') id: number, @Param('node') node: string) {
    return await this.sysService.SysNode(id, node);
  }

  /**
   * 
   * @param id { number }
   * @returns { object }
   */
  @Get(':id/all')
  allOnSys(@Param('id') id: number) {
    return this.sysService.AllOnSys(id);
  }

  /**
   * Permite eliminar una entrada de la tabla 'System'.
   * @param id { number }
   * @returns { object }
   */
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.sysService.RemoveSys(id);
  }
}
