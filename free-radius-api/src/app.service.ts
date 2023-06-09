import { Inject, Injectable } from '@nestjs/common';
import { UserInfo } from './sequeelize/user/user.entity';
import { UserDto } from './dto/user.dto';
import { UserGroup } from './sequeelize/radusergroup/usergroup.entity';
import { RadCheck } from './sequeelize/rasdusercheck/radcheck.entity';

/**
 * Este servicio tiene como objetivo crear un nuevo userinfo, radcheck y radusergroup en una solo peticion para llenar los datos de las tablas. Por ende, solo se encuentra una unica peticion PUT en esta clase.
 */
@Injectable()
export class AppService {
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
   * este metodo llenara las tablas userinfo, radcheck y radusergroup.
   * No todos los valores son obligatorio pero algunos si en orden de no dejar campos vacios en la tabla. Encontrara que muchos campos son evaluado para ver si son llenados con informacion entrante, si el campo no existe o esta vacio se llena con ifo colocado apra funcionar por defecto.
   * Consulte el archivo 'user.dto.ts' en 'src/dto/'  para ver todos los campos.
   * @param { UserDto } dto
   * @returns { usergroup, userinfo, radcheck }
   * @todo Mover objetos a funciones u optro servicio que haga mas manejable la info.
   */
  async postUser(dto: UserDto) {
    try {
      const date = new Date();

      const userinfo = await this.userInfoRepository.create({
        username: dto.username,
        firstname: dto.firstname,
        lastname: dto.lastname,
        email: dto.email,
        department: dto.department ? dto.department : 'No department info',
        company: dto.company ? dto.company : 'No company phone',
        workphone: dto.workphone ? dto.workphone : 'No work phone',
        homephone: dto.homephone ? dto.homephone : 'No home phone',
        mobilephone: dto.mobilephone,
        address: dto.address ? dto.address : 'No address',
        city: dto.city ? dto.city : 'No city',
        state: dto.state ? dto.state : 'No state',
        country: dto.country ? dto.country : 'Venezuela',
        zip: dto.zip ? dto.zip : '0000',
        notes: dto.notes ? dto.notes : '',
        changeuserinfo: dto.changeuserinfo ? dto.changeuserinfo : '0',
        portalloginpassword: dto.portalloginpassword
          ? dto.portalloginpassword
          : '',
        enableportallogin: dto.enableportallogin ? dto.enableportallogin : '0',
        creationdate: date,
        updatedate: date,
        creationby: dto.creationby,
        updateby: 'No update',
      });

      if (!userinfo) return 'No se creo el usuario';

      const radcheck = await this.radcheckRepository.create({
        username: dto.username,
        attribute: dto.attribute,
        op: dto.op,
        value: dto.value,
      });

      console.log(!radcheck);

      if (!radcheck) return 'No se creo el radcheck';

      const usergroup = await this.userGroupRepository.create({
        username: dto.username,
        groupname: dto.groupname,
        priority: dto.priority,
      });

      if (!usergroup) return 'No se creo el usergoup';

      return { usergroup, userinfo, radcheck };
    } catch (err) {
      return err;
    }
  }
}
