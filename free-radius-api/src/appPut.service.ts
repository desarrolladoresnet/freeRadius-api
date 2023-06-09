/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { UserInfo } from './sequeelize/user/user.entity';
import { UserGroup } from './sequeelize/radusergroup/usergroup.entity';
import { RadCheck } from './sequeelize/rasdusercheck/radcheck.entity';
import { UpdateUserInfoDto } from './dto/updateUserInfo.dto';
import { UpdateRadCheckDto } from './dto/updateRadCheck.dto';
import { UpdateUserGroupDto } from './dto/updateUerGroup.dto';

/**
 * Esta ruta se encarga de manejar todas las rutas PUT para actualizar los datos en las tablas.
 */
@Injectable()
export class AppPutService {
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

  /**
   * Realiza el update de la tabla 'userinfo', requeire un numero de 'id' obligatoriamente para operar, de lo contrario la peticion es rechazada.
   * @param { UpdateUserInfoDto } query
   * @returns 1
   */
  async updateUserInfo( query: UpdateUserInfoDto ) {
    try {
      const { id, ...updateData } = query;

      const updateUserInfo = await this.userInfoRepository.update(updateData, {
        where: { id: id }, // Utilizar un objeto plano para el filtro 'where'
      });

      return updateUserInfo;
    } catch (error) {
      throw new Error(error);
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////

  /**
   * Realiza el update de la tabla 'radcheck', requeire un numero de 'id' obligatoriamente para operar, de lo contrario la peticion es rechazada.
   * @param { UpdateRadCheckDto } query 
   * @returns  1 si se realizo alguna operacion, 0 si no se realizo o de rechazo.
   */
  async updateRadCheck(query: UpdateRadCheckDto) {
    try {
      const { id, ...updateData } = query;
      
      const updateRadCheck = await this.radcheckRepository.update(updateData, {
        where: { id: id }, // Utilizar un objeto plano para el filtro 'where'
      });

      return updateRadCheck;
    } catch (error) {
      throw new Error(error);
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////

    /**
   * Realiza el update de la tabla 'radcheck', requeire unstring con un 'username' obligatoriamente para operar, de lo contrario la peticion es rechazada.
   * @param { UpdateUserGroupDto } query 
   * @returns  1 si se realizo alguna operacion, 0 si no se realizo o de rechazo.
   */
  async updateUserGroup(query: UpdateUserGroupDto) {
    try {
      const { username, ...updateData } = query;

      //* Retorna 1 si hace update, 0 si falla o no fue necesario.
      const updateUserGroup = await this.userGroupRepository.update(updateData, {
        where: { username: username },
      });

      return updateUserGroup;
    } catch (error) {
      throw new Error(error);
    }
  }
}
