import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { ZoneDto } from 'src/dto/zone.dto';

/**
 * Esta tabla guarda todo lo reltaivo a las zonas que se relacionan a los servicios.
 */
@Controller('zone')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}

  /**
   * Crea una nueva entrada en en la tabla. Todos los campos son obligatorios.
   * @param data { ZoneDto }
   * @returns { object }
   */
  @Post()
  createZone(@Body() data: ZoneDto) {
    return this.zoneService.CreateZone(data);
  }

  /**
   * Obtiene todas las entradas de la tabla "zone".
   * @returns { Array }
   */
  @Get()
  findAllZone() {
    return this.zoneService.FindAllZones();
  }

  /**
   * Permite obtener una entrada mediante el uso del id.
   * @param id { number }
   * @returns { object }
   */
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.zoneService.FindById(id);
  }

  /**
   * Permite modificar unaentrada mediante su id.
   * @param id { number }
   * @param data { ZoneDto }
   * @returns { object }
   */
  @Put(':id')
  updateZone(@Param('id') id: number, @Body() data: ZoneDto) {
    return this.zoneService.UpdateZone(id, data);
  }
}
