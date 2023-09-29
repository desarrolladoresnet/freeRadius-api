import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { NasService } from './nas.service';
import { NasDto, NasDtoUpdate } from 'src/dto/index';

/**
 * La tabla NAS refiere a "Servidor de Acceso a la Red".
 * Con estos enlaces se pueden alterar las entradas a esa tabla.
 *
 */
@Controller('nas')
export class NasController {
  constructor(private readonly nasService: NasService) {}

  /**
   * Crear entradas del NAS
   * @param data { NasDto } Ver en carpeta dto.
   * @returns { object }
   */
  @Post()
  createNas(@Body() data: NasDto) {
    return this.nasService.CreateNas(data);
  }

  /**
   * Retorna todos los NAS
   * @returns { array }
   */
  @Get()
  getAllNas() {
    return this.nasService.FindAllNas();
  }

  /**
   * Retorna un NAS en particular
   * @param id { number }
   * @returns { object }
   */
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.nasService.FindById(id);
  }

  /**
   * Permite modificar una entrada del NAS
   * @param id { number }
   * @param data { NasDto } Ver en carpeta dto.
   * @returns { object }
   */
  @Put(':id')
  updateNas(@Param('id') id: number, @Body() data: NasDtoUpdate) {
    return this.nasService.UpdateNas(id, data);
  }
}
