import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto, UpdateServiceDto } from '../dto/index';

/**
 * Modulo que reune los principales datos de los servicios prestados a un cliente.
 * Principalmente trata con el id de Wisphub y Radius.
 */
@Controller('services')
export class ServicesController {
  constructor(private servService: ServicesService) {}

  /**
   * Permite crear una nueva entrada en la tabla services.
   * Retorna la entrada creada.
   * @param createServtDto
   * @returns { object }
   */
  @Post()
  create(@Body() data: CreateServiceDto) {
    return this.servService.CreateService(data);
  }

  /**
   * Trae todas la entradas encontradas en la tabla services.
   * @returns { Array }
   */
  @Get()
  findAll() {
    return this.servService.FindAllServices();
  }

  /**
   *
   * @param node
   * @returns
   */
  @Get('sync/:node')
  async sync(@Param('node') node: string) {
    return await this.servService.SyncService(node);
  }

  /**
   * Trae una entrada mendiante el id
   * @param id { number }
   * @returns { object }
   */
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.servService.FindOnService(id);
  }

  /**
   *
   * @param id
   * @returns
   */
  @Get(':id/sys')
  findOneOnSys(@Param('id') id: number) {
    return this.servService.FindOneOnSys(id);
  }

  /**
   * Modifica una entrada mediante el id.
   * Si por alguna razón, como puede ser que el metodo sea llamado por otro metodo en otro modulo, los parametros de update llegan vacios, la peticion será rechazada.
   * @param id { number }
   * @param data { UpdateServDto }
   * @returns { object }
   */
  @Put(':id')
  update(@Param('id') id: number, @Body() data: UpdateServiceDto) {
    return this.servService.UpdateService(id, data);
  }

  /**
   * Elimina una entyrada de la tabla service mediante el id.
   * @param id { number }
   * @returns { object }
   */
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.servService.RemoveService(id);
  }
}
