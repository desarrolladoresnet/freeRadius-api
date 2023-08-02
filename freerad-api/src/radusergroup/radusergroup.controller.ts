import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { RadusergroupService } from './radusergroup.service';
import {
  RadUserGroupDto,
  RadUserGroupUpdateDto,
} from 'src/dto/radUserGroup.dto';

/**
 * Modulo para la tabla "radusergroup".
 * Controla el estado del servicio de un usuario.
 * Originalmente la tabla no posee id y este metodo se creo teniendo en cuenta ese hecho, posteriormente fue agregado  para poder hacer uso del ORM.
 * 
 * En general los ORM solicitan un campo unico para evitar colisiones, pero esta tabla no puede poseer un campo unico ya que un username puede tener un plan (groupname), y al mismo tiempo estar suspendido, lo que implica que el ""username debe aparecer al menos dos veces"".
 * 
 * Se debe crear el campo id en la tabla manualmente y que sea llenado automaticamente.
 * Comando mysql: ALTER TABLE `radius`.`radusergroup` ADD COLUMN id INT AUTO_INC REMENT PRIMARY KEY
 */
@Controller('radusergroup')
export class RadusergroupController {
  constructor(private readonly radUserGroupService: RadusergroupService) {}

  /**
   * Trae todas la entradas de la tabla "radusergroup"
   * @returns { Array }
   */
  @Get()
  getAllUserGroups() {
    return this.radUserGroupService.GetAllUserGroups();
  }

  /**
   * Permite crear una nueva entrada en la tabla "radusergroup".
   * En general este endpoit no debiera ser necesario ya que en la creacion del usuario se debiera crear su entrada respectiva en la tabla.
   * Sin embargo puede ser util al momento de que pueda fallar el registro en la tabla desde la creacion del usuario.
   * @param data { RadUserGroupDto } ver en radUserGroup.dto en la carpeta dto.
   * @returns { object }
   */
  @Post()
  createUserGroup(@Body() data: RadUserGroupDto) {
    return this.radUserGroupService.CreateRadUserGroup(data);
  }

  /**
   * Permite buscar una entrada en particular dentro de la tabla.
   * La busqueda se realiza con el "username" y el "usergroup", aunque no es necesario tener ambos campos, si es necesario que al menos uno de los dos este presente.
   * Originalmente la tabla no posee id y este metodo se creo teniendo en cuenta ese hecho, posteriormente fue agregado  para poder hacer uso del ORM.
   * @param data { RadUserGroupUpdateDto } ver detelles en el radUserGroup.dto en carpeta dto.
   * @returns { Array }
   */
  @Post('find')
  getById(@Body() data: RadUserGroupUpdateDto) {
    return this.radUserGroupService.GetUserGroupById(data);
  }

  /**
   * Para hacer un update de una entrada se va a requerir todos los campos.
   * El dto no lo va a rechazar porque se usa el mismo "RadUserGroupUpdateDto", pero el metodo en custion si, ya que no tiene sentido de que falte alguno de los valores. Se necesita el "username" y el "groupname" para realizar la busqueda, por lo que el unico cambio posible es en "op".
   * @todo Buscar todos los "op" posibles y restringirlos. 
   * @param data { RadUserGroupUpdateDto } ver detelles en el radUserGroup.dto en carpeta dto.
   * @returns { object }
   */
  @Put()
  updateUserGroup(@Body() data: RadUserGroupUpdateDto) {
    return this.radUserGroupService.UpdateUserGroup(data);
  }

  // @Put('delete')
  // delete(@Body() data: RadUserGroupUpdateDto) {
  //   return this.radUserGroupService.DeleteUserGroup(data);
  // }
}
