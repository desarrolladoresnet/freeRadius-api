import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RadcheckService } from './radcheck.service';
import { RadCheckDto, RadCheckUpdateDto } from 'src/dto/radcheck.dto';

/**
 * Aquí van las credenciales de los usuarios. 
 */
@Controller('radcheck')
export class RadcheckController {
  constructor(private readonly radCheckService: RadcheckService) {}

  /**
   * Trae todos lo elementos que se encuentren en la tabla.
   * @returns { array }
   */
  @Get()
  getAllRadCheck() {
    return this.radCheckService.GetAllRadCheck();
  }

  /**
   * Retorna una sola entrada a partir del id ingresado.
   * @param id { number }
   * @returns { object }
   */
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.radCheckService.GetById(id);
  }

  /**
   * Permite la creacion de una entrada a la tabla, se requiere "username" de manera obligatoria, los otros parametros pueden ser enviados, sino se aplican el resto por defecto.
   * @param data { RadCheckDto } Es un objeto con varios campos pero solo 1 es obligatorio.
   * @returns { object }
   */
  @Post()
  createRad(@Body() data: RadCheckDto) {
    return this.radCheckService.CreateRadCheck(data);
  }

  /**
   * Permite la modificacion de una entrada en la tabla, se requiere "username" de manera obligatoria, los otros parametros pueden ser enviados, sino se aplican el resto por defecto.
   * @param id { number }
   * @param data { RadCheckUpdateDto }
   * @returns { object }
   */
  @Put(':id')
  updateradCheck(@Param('id') id: number, @Body() data: RadCheckUpdateDto) {
    return this.radCheckService.UpdateRadCheck(id, data);
  }
}
