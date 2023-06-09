/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { UserInfo } from './sequeelize/user/user.entity';
import { UserGroup } from './sequeelize/radusergroup/usergroup.entity';
import { RadCheck } from './sequeelize/rasdusercheck/radcheck.entity';
import { Op } from "sequelize";

/**
 * En este servicio se encuentran todas las peticiones GET como lo indica su nombre.
 * Las peticiones de un grupo general como puede ser 'radcheck' requiere que se envie un numero de pagina, donde la primera pagina debe ser 0, y a partir de ahi, desde el componente en el front ir incrementando segun la logica manejada en el componente.
 * 
 * Para un objeto en particular se usa el 'id' con excepcion de la tabla 'radusergroup' porque esta no contiene campo 'id' por lo que se usa el 'usaername' para realizar las busquedas.
 */
@Injectable()
export class AppGetService {
    /**
   * Se inyecta respositorios para los modelos de las tablas a usar.
   * userGroupRepository obtiene de la tabla 'radusergroup', se acorto el nombre para facilitar el manejo, de usarse muchas mas tablas se aconseja modificar y usar el nombre completo.
   * @param userInfoRepository 
   * @param userGroupRepository 
   * @param radcheckRepository 
   */
  constructor(
    @Inject('USER_REPOSITORY')
    private userInfoRepository: typeof UserInfo,
    @Inject('USERGROUP_REPOSITORY')
    private userGroupRepository: typeof UserGroup,
    @Inject('RADCHECK_REPOSITORY')
    private radcheckRepository: typeof RadCheck,
  ) {}

  //* USER INFO *//
  /**
   * Solicita a grupos de 50 objetos 'userinfo'.
   * @param { num } offset
   * @returns [{Object}, {Object}, {Object}....]
   */
  async getUserInfo(offset: number) {
    try {
      const usersInfo = await this.userInfoRepository.findAll({
        limit: 50,
        offset: offset,
        order: [['id', 'ASC']], // Orden ascendente por el campo 'id'
      });

      if (usersInfo?.length < 1) return 'No users Info';

      return usersInfo;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Busca un solo objeto 'userinfo' usando su numero de id.
   * @param { num } id 
   * @returns { Object }
   */
  async getUserById(id: number) {
    try {
      const usersInfo = await this.userInfoRepository.findAll({
        where: { id },
        order: [['id', 'ASC']], // Orden ascendente por el campo 'id'
      });

      if (usersInfo?.length < 1) return 'No users Info';

      return usersInfo;
    } catch (erro) {}
  }

  /**
   * Permite buscar objetos de la tabla "userinfo" por medio de de strings que se comparan con los campos: username, fisrtname, lastname y email.
   * @param { Array<string> } query 
   * @returns  Arra de objetos [{Object}, {Object}, {Object}, .....]
   */
  async userSearch(query: Array<string>) {
    try {
      const usersInfo = await this.userInfoRepository.findAll({
        where: {
          [Op.or]: [
            {username: {[Op.or]: query } },
            {firstname: {[Op.or]: query } },
            {lastname: {[Op.or]: query } },
            {email: {[Op.or]: query } },
          ]
        },
      });

      if (usersInfo?.length < 1) return 'No users Info';

      return usersInfo;
    } catch (erro) {}
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //* RADCHECK *//
  /**
   * Solicita a grupos de 50 objetos 'radcheck'.
   * @param offset num
   * @returns [{Object}, {Object}, {Object}....]
   */
  async getRadChecks(offset: number) {
    try {
      const radcheck = await this.radcheckRepository.findAll({
        limit: 50,
        offset: offset,
        order: [['id', 'ASC']], // Orden ascendente por el campo 'id'
      });

      if (radcheck?.length < 1) return 'No users Info';

      return radcheck;
    } catch (error) {
      throw new Error(error);
    }
  }

    /**
   * Busca un solo objeto 'radcheck' usando su numero de id.
   * @param id 
   * @returns { Object }
   */
  async getRadChecksById(id: number) {
    try {
      const radcheck = await this.radcheckRepository.findAll({
        where: { id },
        order: [['id', 'ASC']], // Orden ascendente por el campo 'id'
      });

      if (radcheck?.length < 1) return 'No users Info';

      return radcheck;
    } catch (error) {
      throw new Error(error);
    }
  }


  /**
   * Permite buscar objetos de la tabla "radcheck" por medio de de strings que se comparan con el campo username.
   * @param { Array<string> } query 
   * @returns  Arra de objetos [{Object}, {Object}, {Object}, .....]
   */
  async radCheckSearch(query: Array<string>) {
    try {
      const usersInfo = await this.radcheckRepository.findAll({
        where: {
          [Op.or]: [
            {username: {[Op.or]: query } },
          ]
        },
      });

      if (usersInfo?.length < 1) return 'No users Info';

      return usersInfo;
    } catch (erro) {}
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //* USERGROUP *//
    /**
   * Solicita a grupos de 50 objetos 'radusergroup'.
   * @param offset num
   * @returns [{Object}, {Object}, {Object}....]
   */
  async getRadUserGroup(offset: number) {
    try {
      const userGroup = await this.userGroupRepository.findAll({
        limit: 50,
        offset: offset,
        order: [['username', 'ASC']], // Orden ascendente por el campo 'id'
      });

      if (userGroup?.length < 1) return 'No users Info';

      return userGroup;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Busca un solo objeto 'username' usando un string con su nombre.
   * @param username
   * @returns { Object }
   */
  async getRadUserGroupById(username: string) {
    try {
      const radcheck = await this.userGroupRepository.findAll({
        where: { username },
        order: [['username', 'ASC']], // Orden ascendente por el campo 'id'
      });

      if (radcheck?.length < 1) return 'No users Info';

      return radcheck;
    } catch (error) {
      throw new Error(error);
    }
  }


  /**
   * Permite buscar objetos de la tabla "radusergroup" por medio de de strings que se comparan con el campo username.
   * @param { Array<string> } query 
   * @returns  Arra de objetos [{Object}, {Object}, {Object}, .....]
   */
  async radUserGroupSearch(query: Array<string>) {
    try {
      const usersInfo = await this.userGroupRepository.findAll({
        where: {
          [Op.or]: [
            {username: {[Op.or]: query } },
          ]
        },
      });

      if (usersInfo?.length < 1) return 'No usersgroup find';

      return usersInfo;
    } catch (erro) {}
  }

}
