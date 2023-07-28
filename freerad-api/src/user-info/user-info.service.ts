import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from 'src/dto/user.dto';
import { RadCheck } from 'src/database/radcheck.entity';
import { RadUserGroup } from 'src/database/radusergroup.entity';
import { UserInfo } from 'src/database/user.entity';
import { UserUpdateDto } from 'src/dto/userUpdate.dto';

@Injectable()
export class UserInfoService {
  constructor(
    @InjectRepository(UserInfo)
    private usersRepository: Repository<UserInfo>,
    @InjectRepository(RadCheck)
    private radCheckRepository: Repository<RadCheck>,
    @InjectRepository(RadUserGroup)
    private radUserGroupRepository: Repository<RadUserGroup>,
  ) {}

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  async CreateUser(data: UserDto) {
    try {
      const {
        firstname,
        lastname,
        username,
        updateby,
        creationby,
        value,
        groupname,
        priority,
      } = data;

      /**
       ** USERIFNO
       */

      console.log(`Creando el usuario: ${username}`);

      const ifUser = await this.usersRepository.findOneBy({
        username: username,
      });

      if (ifUser) {
        console.log(`La onu: ${username} ya esta registrada.`);
        console.log(`------------------------------------------------\n`);

        return `La onu: ${username} ya esta registrada.`;
      }

      const newLocal = this.usersRepository.create({
        firstname: firstname,
        lastname: lastname,
        username: username,
        updateby: updateby,
        creationby: creationby,
        creationdate: new Date(),
        updatedate: new Date(),
        /* CAMPOS OPCIONALES */
        email: data?.email ? data.email : '0',
        country: 'Venezuela',
        department: data?.department ? data.department : '0',
        company: data?.company ? data.company : '0',
        workphone: data?.workphone ? data.workphone : '0',
        homephone: data?.homephone ? data.homephone : '0',
        mobilephone: data?.mobilephone ? data.mobilephone : '0',
        address: data?.address ? data.address : '0',
        city: data?.city ? data.city : '0',
        state: data?.state ? data.state : '0',
        zip: data?.zip ? data.zip : '0',
        notes: data?.notes ? data.notes : 'Sin notas',
        changeuserinfo: data?.changeuserinfo ? data.changeuserinfo : '0',
        portalloginpassword: data?.portalloginpassword
          ? data.portalloginpassword
          : '0',
        enableportallogin: data?.enableportallogin ? data.enableportallogin : 0,
      });
      const newUser = newLocal;
      console.log(newUser);
      const user = await this.usersRepository.save(newUser);

      if (!user) {
        console.log(`No se pudo crear el usuario/onu: ${username}`);
        console.log(`------------------------------------------------\n`);

        return `No se pudo crear el usuario/onu: ${username}`;
      }

      /*
       * RADCHECK
       */

      console.log(`Registrando radcheck de ${username}`);
      const radcheckCreate = await this.radCheckRepository.create({
        username: username,
        attribute: 'Cleartext-Password',
        op: ':=',
        value: value ? value : '10',
      });

      const saveRadCheck = await this.radCheckRepository.save(radcheckCreate);

      if (!saveRadCheck) {
        console.log(
          `Hubo un error al guardar los datos del usuario/onu: ${username} en la tabla "radcheck"`,
        );
        console.log(`------------------------------------------------\n`);

        return `Hubo un error al guardar los datos del usuario/onu ${username} en la tabla "radcheck"`;
      }
      console.log(`\nExito al registrar el RADCHECK`);

      /**
       ** RADUSERGROUP
       */

      console.log(`Registrando usergroup de ${username}`);
      const usergroup = await this.radUserGroupRepository.create({
        username: username,
        groupname: groupname,
        priority: priority ? priority : 10,
      });

      const saveUserGroup = await this.radUserGroupRepository.save(usergroup);

      if (!saveUserGroup) {
        console.log(
          `Hubo un error al guardar los datos del usuario/onu ${username} en la tabla "radusergroup"`,
        );
        console.log(`------------------------------------------------\n`);
        return `Hubo un error al guardar los datos del usuario/onu ${username} en la tabla "radusergroup"`;
      }

      console.log(`Usuario/Onu ${username} registrado exitosamente`);
      console.log(`------------------------------------------------\n`);

      return user;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return error;
    }
  }

  async FindAllUsers() {
    try {
      console.log(`Bucando usuarios/onu`);
      const users = await this.usersRepository.find();

      if (users?.length < 1) {
        console.log('No se encontraron usuarios/onu');
        console.log(`------------------------------------------------\n`);
        return 'No se encontraron usuarios/onu';
      }

      console.log(
        `Se encontraron ${users.length} usuarios/onus \n------------------------------------------------\n`,
      );
      return users;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return error;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  async FindById(id: number) {
    try {
      console.log(`Bucando usuario con id: ${id}`);
      const users = await this.usersRepository.findOneBy({ id: id });

      if (!users) {
        console.log(`No se econtro usuario con id: ${id}`);
        console.log(`------------------------------------------------\n`);
        return `No se econtro usuario con id: ${id}`;
      }

      console.log(
        `Usuario encontrado!\n------------------------------------------------\n`,
      );
      return users;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return error;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  async UpdateUserInfo(id: number, data: UserUpdateDto) {
    try {
      console.log(`Actualizando al usuario: ${data.username}`);

      const User = await this.usersRepository.findOneBy({
        username: data.username,
      });

      if (!User) {
        console.log(`La onu: ${data.username} no está asignada o no existe.`);
        console.log(`------------------------------------------------\n`);

        return `La onu: ${data.username} no está asignada o no existe`;
      }

      User.firstname = data?.firstname ? data.firstname : User.firstname;
      User.lastname = data?.lastname ? data.lastname : User.lastname;
      User.username = data?.username ? data.username : User.lastname;
      User.email = data?.email ? data.email : User.email;
      User.department = data?.department ? data.department : User.department;
      User.company = data?.company ? data.company : User.company;
      User.workphone = data?.workphone ? data.workphone : User.workphone;
      User.homephone = data?.homephone ? data.homephone : User.homephone;
      User.mobilephone = data?.mobilephone
        ? data.mobilephone
        : User.mobilephone;
      User.address = data?.address ? data.address : User.address;
      User.city = data?.city ? data.city : User.city;
      User.state = data?.state ? data.state : User.state;
      User.zip = data?.zip ? data.zip : User.zip;
      User.notes = data?.notes ? data.notes : User.notes;
      User.changeuserinfo = data?.changeuserinfo
        ? data.changeuserinfo
        : User.changeuserinfo;
      User.portalloginpassword = data?.portalloginpassword
        ? data.portalloginpassword
        : User.portalloginpassword;
      User.enableportallogin = data?.enableportallogin
        ? data.enableportallogin
        : User.enableportallogin;
      User.updateby = data.updateby;
      User.updatedate = new Date();

      const updateUser = await this.usersRepository.save(User);

      if (!updateUser) {
        console.log(`No se pudo actualizar la onu : ${data.username}`);
        console.log(`------------------------------------------------\n`);

        return `No se pudo actualizar la onu : ${data.username}`;
      }

      return updateUser;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return error;
    }
  }
}
