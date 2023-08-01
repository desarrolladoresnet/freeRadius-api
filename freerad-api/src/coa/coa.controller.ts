import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CoaService } from './coa.service';
import { ChangePlanDto, CoaDto } from 'src/dto/coa.dto';

/**
 * Metodo de entrada a las rutas relacionada al CoA de Radius.
 */
@Controller('coa')
export class CoaController {
  constructor(private readonly coaService: CoaService) {}

  /**
   * Ruta para la suspencion de usuarios.
   * @param username { string } llega por Param.
   * @returns { method } 
   */
  @Get('suspend/:username')
  async suspendUser(@Param('username') username: string) {
    console.log('Username', username);
    return this.coaService.SuspendUser(username);
  }

  /**
   * Ruta para la activacion de usuarios.
   * @param username 
   * @returns 
   */
  @Get('activate/:username')
  async activateUser(@Param('username') username: string) {
    console.log('Username', username);
    return this.coaService.ActivateUser(username);
  }

  /**
   * Ruta para cambio de plan del usuario.
   * @param data { ChangePlanDto } viene con dos string, username con nombre de la ONU y "groupname" con el nuevo plan.
   * @returns 
   */
  @Post('change-plan')
  async changePlan(@Body() data: ChangePlanDto) {
    return this.coaService.ChangePlan(data);
  }

    /**
   * Ruta para cambio de plan del usuario.
   * @param data { CoaDto } Ver CoaDto en la carpeta de Ddto. 
   * @returns 
   */
  @Post('modify-plan')
  async modifyPlan(@Body() data: CoaDto) {
    return this.coaService.Modify(data);
  }
}
