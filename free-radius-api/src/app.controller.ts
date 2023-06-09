import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AppGetService } from './appGet.service';
import { AppPutService } from './appPut.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserInfoDto } from './dto/updateUserInfo.dto';
import { UpdateUserGroupDto } from './dto/updateUerGroup.dto';
import { UpdateRadCheckDto } from './dto/updateRadCheck.dto';

/**
 * De momento solo hay un 'Controller', pero se separaron las operacviones en diferente Servicios segun el verbo HTTP.
 * Es decir hay un servicio para las peticiones GET, otro para POST y otro mas para las PUT.
 * No se usara (al menos de momento) un servicio con peticiones Delete, si hay que borrar valores se hace en DaloRadius.
 */
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly appGetService: AppGetService,
    private readonly appPutService: AppPutService,
  ) {}

  /**
   * Retorna a los usuarios de manera paginada en grupos de 50 para no cargar demasiado la BD durante las peticiones asi como la API enviando informacion.
   * Se debe enviar el numero de pagina a traves de los parametros.
   * @param { number } offset
   * @returns [{Object}, {Object}, ....]
   */
  @Get('page/:offset')
  getUsersInfo(@Param('offset', ParseIntPipe) offset: number) {
    return this.appGetService.getUserInfo(offset);
  }

  /**
   * Permite obtener un unico Objeto UserInfo a partir de la busqueda por 'id'.
   * Usar para editar los valores mediante un 'Put.'
   * @param { number } id
   * @returns Object
   */
  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.appGetService.getUserById(id);
  }

  /**
   * Permite editar la info de un objeto UserInfo. Se debe enviar los datos a editar, no requiere todos los campos editables pero requiere el id.
   * @example { id: 14, email: unemail@email.com}
   * @param  {  UpdateUserInfoDto } query
   * @returns 1 si se realizo alguna operacion, 0 si no se realizo o de rechazo.
   */
  @Put()
  updateUserInfo(@Body() query: UpdateUserInfoDto) {
    return this.appPutService.updateUserInfo(query);
  }

  //* OPERACIONES DE RADCHECK *//

  /**
   * Retorna a la info del 'radcheck' de manera paginada en grupos de 50 para no cargar demasiado la BD durante las peticiones asi como la API enviando informacion.
   * Se debe enviar el numero de pagina a traves de los parametros.
   * @param { number } offset
   * @returns [{Object}, {Object}, ....]
   */
  @Get('radcheck/page/:offset')
  getRadChecks(@Param('offset', ParseIntPipe) offset: number) {
    return this.appGetService.getRadChecks(offset);
  }

  /**
   * Permite obtener un unico Objeto Radcheck a partir de la busqueda por 'id'.
   * Usar para editar los valores mediante un 'Put.'
   * @param { number } id
   * @returns
   */
  @Get('radcheck/:id')
  getRadChecksById(@Param('id') id: number) {
    return this.appGetService.getRadChecksById(id);
  }

  /**
   * Permite editar las filas del la tabla 'radcheck'. Muchos de los parametors son opcionales pero se encesita el 'id' de la fila a editar o se rechaza la peticion.
   * @param { UpdateRadCheckDto } query
   * @returns 1 si se realizo alguna operacion, 0 si no se realizo o de rechazo.
   */
  @Put('radcheck')
  updateRadCheck(@Body() query: UpdateRadCheckDto) {
    return this.appPutService.updateRadCheck(query);
  }

  //* OPERACIONES DE USERGROUP *//
  /**
   * Retorna ala info del 'radusergroup' de manera paginada en grupos de 50 para no cargar demasiado la BD durante las peticiones asi como la API enviando informacion.
   * Se debe enviar el numero de pagina a traves de los parametros.
   * @param offset
   * @returns []
   */
  @Get('radusergroup/page/:offset')
  getRadUserGroup(@Param('offset', ParseIntPipe) offset: number) {
    return this.appGetService.getRadUserGroup(offset);
  }

  /**
   * Permite obtener un unico Objeto Radcheck a partir de la busqueda por el campo 'username'. radusergroup no posee id para las filas, ademas se tuvo que colocar el username como Primary Key para poder insertar lo valores a travez de Sequelize.
   * Usar para editar los valores mediante un 'Put.'
   * @param username
   * @returns
   */
  @Get('radusergroup/:username')
  getRadUserGroupByID(@Param('username') username: string) {
    return this.appGetService.getRadUserGroupById(username);
  }

  /**
   * Permite editar las filas del la tabla 'radusergroup'. A diferencia de las otras tablas manejadas en la API, esta tabla no posee un campo 'id', se uso el 'username' como primary key por lo que se requiere para poder realizar la peticion, sino, se rechaza la operacion.
   * @param { UpdateUserGroupDto } query
   * @returns 1 si se realizo alguna operacion, 0 si no se realizo o de rechazo.
   */
  @Put('radusergroup')
  updateUserGroup(@Body() query: UpdateUserGroupDto) {
    return this.appPutService.updateUserGroup(query);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  //* RUTA POST PARA CREACION DE NUEVAS FILAS EN LA TRES TABLAS *//
  /**
   * Con esta ruta son llenadas las tres tablas en una sola peticion.
   * No todos los valores son obligatorio pero algunos si en orden de no dejar campos vacios en la tabla. Encontrara que muchos campos son evaluado para ver si son llenados con informacion entrante, si el campo no existe o esta vacio se llena con ifo colocado apra funcionar por defecto.
   * Consulte el archivo 'user.dto.ts' en 'src/dto/'  para ver todos los campos.
   * @param dto
   * @returns {Obejct}
   */
  @Post()
  async postTest(@Body() dto: UserDto) {
    return this.appService.postUser(dto);
  }
}
