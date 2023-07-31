import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RadUserGroup } from 'src/database/radusergroup.entity';
import {
  RadUserGroupDto,
  RadUserGroupUpdateDto,
} from 'src/dto/radUserGroup.dto';
import { Repository } from 'typeorm';

@Injectable()
export class RadusergroupService {
  constructor(
    @InjectRepository(RadUserGroup)
    private readonly radUserGroup: Repository<RadUserGroup>,
  ) {}

  async CreateRadUserGroup(data: RadUserGroupDto) {
    try {
      const { username, groupname, priority } = data;

      console.log(
        `Creando nuevo usergroup, con username ${username}, y groupname ${groupname}.`,
      );

      const isUserGroup = await this.radUserGroup.findOneBy({
        username: username,
        groupname: groupname,
      });

      if (isUserGroup) {
        console.log(
          `Ya existe un UserGroup con username ${username} y groupname ${groupname}.`,
        );
        console.log(`------------------------------------------------\n`);
        return `Ya existe un UserGroup con username ${username} y groupname ${groupname}.`;
      }

      const newUserGroup = await this.radUserGroup.create({
        username,
        groupname,
        priority: priority ? priority : 10,
      });

      const saveUserGroup = await this.radUserGroup.save(newUserGroup);

      if (!saveUserGroup) {
        console.log(
          `Hubo un problema al salvar los datos de username ${username} y groupname ${groupname}`,
        );
        console.log(`------------------------------------------------\n`);
        return `Hubo un problema al salvar los datos de username ${username} y groupname ${groupname}`;
      }

      return saveUserGroup;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return error;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  async GetAllUserGroups() {
    try {
      const allUserGroups = await this.radUserGroup.find();

      if (allUserGroups?.length < 1) {
        console.log(`No se encontraron UserGroups en la Base de Datos`);
        return `No se encontraron UserGroups en la Base de Datos`;
      }

      console.log(`------------------------------------------------\n`);
      return allUserGroups;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return error;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  async GetUserGroupById(data: RadUserGroupUpdateDto) {
    let username = data.username || '"vacio"';
    let groupname = data.groupname || '"vacio"';

    if (username == 'vacio' && groupname == 'vacio') {
      console.log('Busqueda invalida');
      console.log(`------------------------------------------------\n`);
      return 'Busqueda invalida';
    }

    try {
      console.log(
        `Buscando groupname con valores, username: ${username} y groupname: ${groupname}.`,
      );

      let userGroup;
      /**
       * Busqueda para cuando los parametros no lleguen vacios.
       */
      if (username != 'vacio' && groupname != 'vacio') {
        userGroup = await this.radUserGroup.find({
          where: [{ username, groupname }],
        });
      }

      /**
       * Si uno de los parametros llega vacio o la primera bsuqueda falla.
       */
      if (
        username == 'vacio' ||
        groupname == 'vacio' ||
        userGroup?.length < 1
      ) {
        userGroup = await this.radUserGroup.find({
          where: [
            { username },
            { groupname },
            { username: groupname },
            { groupname: username },
          ],
        });
      }

      if (userGroup?.length < 1 || !userGroup) {
        username = username || '(No se evnvio valor para Username)';
        groupname = groupname || '(No se evnvio valor para Groupname)';
        console.log(`------------------------------------------------\n`);
        return `No se encontraron datos con los valores username: ${username} y groupname: ${groupname}`;
      }

      return userGroup;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return error;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  async UpdateUserGroup(data: RadUserGroupUpdateDto) {
    const { username, groupname, priority } = data;

    if (!username || (!groupname && !priority)) {
      console.log(`Operacion invalida`);
      console.log(`------------------------------------------------\n`);
      return `Operacion invalida`;
    }

    try {
      const toUpdate = await this.radUserGroup.findOneBy({ username });

      if (!toUpdate) {
        console.log(`No se encontro un username: ${username}`);
        console.log(`------------------------------------------------\n`);
        return `No se encontro un username: ${username}`;
      }

      toUpdate.groupname = groupname ? groupname : toUpdate.groupname;
      toUpdate.priority = priority ? priority : toUpdate.priority;

      const userGroupUpdated = await this.radUserGroup.save(toUpdate);
      if (!userGroupUpdated) {
        console.log(
          `Hubo un problema al actualizar el grupo del username: ${username}`,
        );
        console.log(`------------------------------------------------\n`);
        return false;
      }

      console.log(userGroupUpdated);
      console.log(`------------------------------------------------\n`);
      return userGroupUpdated;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Metodo de uso interno, no debe cortar la ejecucion.
   * Por eso retorna boolean.
   */
  async DeleteUserGroup(data: RadUserGroupUpdateDto) {
    const { username, groupname } = data;

    if (!username || !groupname) {
      console.log(
        `Operacion invalida por falta de datos para "username" y/o groupname"`,
      );
      return false;
    }

    try {
      console.log('Borrando');
      const toDelete = await this.radUserGroup.delete({
        username,
        groupname,
      });

      if (!toDelete) {
        console.log(`No se encontro un username: ${username}`);
        // console.log(`------------------------------------------------\n`);
        return false;
      }

      console.log(toDelete);
      // console.log(`------------------------------------------------\n`);
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
