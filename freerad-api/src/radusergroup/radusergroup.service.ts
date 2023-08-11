/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RadUserGroup } from 'src/database/radusergroup.entity';
import {
  RadUserGroupDto,
  RadUserGroupUpdateDto,
} from 'src/dto/radUserGroup.dto';
import { Not, Repository } from 'typeorm';

/**
 * Originalmente la tabla no posee id y este metodo se creo teniendo en cuenta ese hecho, posteriormente fue agregado  para poder hacer uso del ORM.
 */
@Injectable()
export class RadusergroupService {
  constructor(
    @InjectRepository(RadUserGroup)
    private readonly radUserGroup: Repository<RadUserGroup>,
  ) {}

  /**
   * Para crear una entrada el "username" y el "groupname" son obligatorios.
   * El "priority" se setea en 10 por default pero puede ser colocado en cualquier otro valor.
   * @param data { RadUserGroupDto }
   * @returns { object }
   */
  async CreateRadUserGroup(data: RadUserGroupDto) {
    try {
      const { username, groupname, priority } = data;

      console.log(
        `Creando nuevo usergroup, con username ${username}, y groupname ${groupname}.`,
      );

      //* VERIFICA LA EXISTENCIA DEL USUARIO *//
      const isUserGroup = await this.radUserGroup.findOneBy({
        username: username,
        groupname: groupname,
      });
      if (isUserGroup) {
        const str = `Ya existe un UserGroup con username ${username} y groupname ${groupname}.`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        const err = new Error(str)
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: str,
          },
          HttpStatus.CONFLICT,
          {
            cause: err,
          }
        );
      }

      const newUserGroup = await this.radUserGroup.create({
        username,
        groupname,
        priority: priority ? priority : 10,
      });

      const saveUserGroup = await this.radUserGroup.save(newUserGroup);

      if (!saveUserGroup) {
        const str = `Hubo un problema al salvar los datos de username ${username} y groupname ${groupname}`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        
        const err = new Error(str)
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: str,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
          {
            cause: err,
          }
        );
      }

      console.log(saveUserGroup);
      console.log("")

      console.log(
        `usergroup para el username ${username} creado exitosamente.\n------------------------------------------------\n`,
      );
      return saveUserGroup;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Trae todas las entradas que hay en la tabla.
   * @todo paginar
   * @returns { Array }
   */
  async GetAllUserGroups() {
    try {
      console.log(`Buscando las entradas de radusergroup`);
      const allUserGroups = await this.radUserGroup.find();

      if (allUserGroups?.length < 1) {
        const str = `No se encontraron UserGroups en la Base de Datos`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        
        const err = new Error(str)
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: str,
          },
          HttpStatus.NOT_FOUND,
          {
            cause: err,
          }
        );
      }

      console.log(
        `${allUserGroups?.length} entradas encontradas.\n------------------------------------------------\n`,
      );
      return allUserGroups;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Permite buscar una entrada en particular dentro de la tabla.
   * La busqueda se realiza con el "username" y el "usergroup", aunque no es necesario tener ambos campos, si es necesario que al menos uno de los dos este presente.
   * @param data { RadUserGroupUpdateDto } ver detelles en el radUserGroup.dto en carpeta dto.
   * @returns { Array }
   */
  async GetUserGroupById(data: RadUserGroupUpdateDto) {
    let username = data.username || '"vacio"';
    let groupname = data.groupname || '"vacio"';

    //* Se verifica que haya parametros suficientes para realizar una busqueda *//
    if (username == 'vacio' && groupname == 'vacio') {
      const str = 'Busqueda invalida';
      console.log(`${str}\n------------------------------------------------\n`);

      const err = new Error(str)
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: str,
          },
          HttpStatus.BAD_REQUEST,
          {
            cause: err,
          }
        );
    }

    try {
      console.log(
        `Buscando groupname con valores, username: ${username} y groupname: ${groupname}.`,
      );

      //* Variable que contendra los resultados.
      let userGroup;

      // * Busqueda para cuando los parametros no lleguen vacios *//
      if (username != 'vacio' && groupname != 'vacio') {
        userGroup = await this.radUserGroup.find({
          where: [{ username, groupname }],
        });
      }

      //* Si uno de los parametros llega vacio o la primera bsuqueda falla *//
      if (
        username == 'vacio' ||
        groupname == 'vacio' ||
        userGroup?.length < 1
      ) {
        //* Busca de todas las formas posibles.
        userGroup = await this.radUserGroup.find({
          where: [
            { username },
            { groupname },
            { username: groupname },
            { groupname: username },
          ],
        });
      }

      //* Se verifica que se encontraran resultados *//
      if (userGroup?.length < 1 || !userGroup) {
        username = username || '(No se envio valor para Username)';
        groupname = groupname || '(No se envio valor para Groupname)';
        const str = `No se encontraron datos con los valores username: ${username} y groupname: ${groupname}`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        
        const err = new Error(str)
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: str,
          },
          HttpStatus.NOT_FOUND,
          {
            cause: err,
          }
        );
      }

      console.log(
        `Se encontraron ${userGroup?.length} resultados\n------------------------------------------------\n`,
      );
      return userGroup;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Para hacer un update de una entrada se va a requerir todos los campos.
   * @param data { RadUserGroupUpdateDto } ver detelles en el radUserGroup.dto en carpeta dto.
   * @returns { object }
   */
  async UpdateUserGroup(data: RadUserGroupUpdateDto) {
    const { username, groupname, priority } = data;

    //* Se verifica que no haya campos vacios para realizar el update *//
    if (!username || !groupname || !priority) {
      const str = `Operación inválida`;
      console.log(`${str}\n------------------------------------------------\n`);
      
      const err = new Error(str)
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: str,
          },
          HttpStatus.BAD_REQUEST,
          {
            cause: err,
          }
        );
    }

    try {
      console.log(
        `Haciendo update a username:${username}, con groupname:${groupname} `,
      );
      const toUpdate = await this.radUserGroup.findOneBy({
        username,
        groupname: Not('suspendedido'),
    
      });

      if (!toUpdate) {
        const str = `No se encontró un username: ${username}, y  groupname:${groupname}`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
      }

      //* Actualizacion de los campos *//
      toUpdate.groupname = groupname ? groupname : toUpdate.groupname;
      toUpdate.priority = priority ? priority : toUpdate.priority;

      const userGroupUpdated = await this.radUserGroup.save(toUpdate);
      if (!userGroupUpdated) {
        const str = `Hubo un problema al actualizar el grupo del username: ${username}`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        const err = new Error(str)
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: str,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
          {
            cause: err,
          }
        );
      }

      console.log(
        `Actualización exitosa\n------------------------------------------------\n`,
      );
      return userGroupUpdated;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Metodo de uso interno, no debe cortar la ejecucion en ningun momento.
   * Por eso retorna boolean.
   * @param data { RadUserGroupUpdateDto } ver detelles en el radUserGroup.dto en carpeta dto.
   * @returns { bolean }
   */
  async DeleteUserGroup(data: RadUserGroupUpdateDto) {
    const { username, groupname } = data;

    if (!username || !groupname) {
      const str =  `Operación inválida por falta de datos para "username":${username} y/o groupname":${groupname}`;
      console.log(
        `${str}\n------------------------------------------------\n`,
      );
      return false;
    }

    try {
      console.log(
        `Borrando entrada de "username":${username} y/o groupname":${groupname}`,
      );
      const toDelete = await this.radUserGroup.delete({
        username,
        groupname,
      });

      if (!toDelete) {
        const str = `Hubo un problema al eliminar la entrada o no se encontro un "username":${username} con groupname":${groupname}`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return false;
      }

      console.log("Entrada eliminada exitosamente");
      return true;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return false;
    }
  }
}
