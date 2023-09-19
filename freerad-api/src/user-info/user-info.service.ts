/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Not, Repository } from 'typeorm';
import { UserDto } from 'src/dto/user.dto';
import { UserUpdateDto } from 'src/dto/userUpdate.dto';
import { RadCheck } from 'src/database/entities/radcheck.entity';
import { RadUserGroup } from 'src/database/entities/radusergroup.entity';
import { UserInfo } from 'src/database/entities/user.entity';
import { RadGroupReply } from 'src/database/entities/radgroupreply.entity';

@Injectable()
export class UserInfoService {
  constructor(
    @InjectRepository(UserInfo)
    private usersRepository: Repository<UserInfo>,
    @InjectRepository(RadCheck)
    private radCheckRepository: Repository<RadCheck>,
    @InjectRepository(RadUserGroup)
    private radUserGroupRepository: Repository<RadUserGroup>,
    @InjectRepository(RadGroupReply)
    private radGroupReply: Repository<RadGroupReply>,
  ) {}

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Enpoint principal de la app.
   * La info puede ser enviada varias veces, en caso de que los datos ya se encuentren en la BD,
   * se hará un salto a la siguiente parte del proceso. 
   * Esto con motivo de que si por alguna razón, fallara el proceso de guardado, se pueda reintentar inmediatamente.
   * Retorna el objeto creado más un campo 'msj' con todos los mensajes del proceso.
   * @param data { UserDto }
   * @returns { object }
   */
  async CreateUser(data: UserDto) {
    const date = new Date();
    console.log(`Se inicia creación de usuario.\nFecha: ${date}\n`)
    try {
      const {
        firstname,
        lastname,
        username,
        creationby,
        groupname,
        priority,
        address,
        password,
      } = data;

      let msj = '';
      /////////////////////////////////////////////////////////////////////////////
      //      USERINFO                                                          //
      /////////////////////////////////////////////////////////////////////////////

      //* Si no existe el plan se aborta toda la operación *//
      const isPlan = await this.radGroupReply.findOneBy({ groupname });
      if(!isPlan) {
        const err = new Error('El plan no existe en la base de datos.')
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'El plan no existe en la base de datos.',
          },
          HttpStatus.BAD_REQUEST,
          {
            cause: err,
          },
        );
      };

      console.log(`Creando el usuario/onu: ${username}`);

      //* Se verifica si ya hay un username en la BD *//
      const ifUser = await this.usersRepository.findOneBy({
        username: username,
      });


      let user;
      if (ifUser) {
        // Si exite se salta al siguiente paso.
        const str = `El username/onu: ${username} ya esta registrada como usuario.\n`;
        msj += str;
        console.log(`${str}`);
        user = ifUser;
      }
      else {
        const nowDate = new Date();

        const newLocal = this.usersRepository.create({
          firstname: firstname,
          lastname: lastname,
          username: username,
          creationby: creationby,
          address: address,
          /* CAMPOS OPCIONALES */
          // La idea es no dejar campos vacíos que pudioeran ser explotados por un Hacker.
          // Por otro lado, siempre se hace una lectura de todos los campos en el 'dto' por si en algun momento futuro se llega a necesitar. 
          updateby: creationby, // se deja igual que creation by, lo que indica que nunca se le ha hecho update.
          email: data?.email ? data.email : '0',
          country: 'Venezuela',
          department: data?.department ? data.department : '0',
          company: data?.company ? data.company : '0',
          workphone: data?.workphone ? data.workphone : '0',
          homephone: data?.homephone ? data.homephone : '0',
          mobilephone: data?.mobilephone ? data.mobilephone : '0',
          city: data?.city ? data.city : '0',
          state: data?.state ? data.state : '0',
          zip: data?.zip ? data.zip : '0',
          notes: data?.notes ? data.notes : 'Sin notas',
          changeuserinfo: data?.changeuserinfo ? data.changeuserinfo : '0',
          portalloginpassword: data?.portalloginpassword
            ? data.portalloginpassword
            : '0',
          enableportallogin: data?.enableportallogin ? data.enableportallogin : 0,
          creationdate: nowDate,
          updatedate: nowDate,

        });
        const newUser = newLocal;
        console.log(newUser);
        user = await this.usersRepository.save(newUser);

        //* Verifica que el usuario haya sido creado exitosamente *//
        if (!user) {
          // Si falla en este punto se corta la ejecución y se envia msj de error.
          const str = `No se pudo crear el usuario/onu: ${username}`;
          console.log(`------------------------------------------------\n`);
  
          const err = new Error(str);
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              error: str,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
            {
              cause: err,
            },
          );
        }
      }

      /////////////////////////////////////////////////////////////////////////////
      //       RADCHECK                                                          //
      /////////////////////////////////////////////////////////////////////////////

      console.log(`Registrando radcheck de ${username}`);

      const isRadcheck = await this.radCheckRepository.findOneBy({username})
      //* Se verifica si existe la entrada en la tabla para ese username *//
      if (isRadcheck) {
        // Evalua si el password es igual.
        if(!(isRadcheck.value === password)) {
          const str = `El password difiere, se procede a actualizar.\n`;
          isRadcheck.value = password;
          console.log(`${str}`);
          msj += str;
          const actualizedRadcheck = await this.radCheckRepository.save(isRadcheck);
          // Verifica si hubo error en la actualizacion del password
          if(!actualizedRadcheck) {
            const str = `Hubo un problema al actualizar el password de: ${username}.\n`;
            console.log(`${str}`);
            msj += str;
          }
        }
          // Si no hay necesidad de actualizar el password se añade este msj.
        else {
          const str = `Ya existe una entrada radcheck para el usuario: ${username}, y con el mismo password.\n`;
          console.log(`${str}`);
          msj += str;
        }
      }
      //* Si el usuario no existe en la tabla, se procede a ser creado *//
      else {
        
      const radcheckCreate = this.radCheckRepository.create({
        username: username,
        attribute: 'Cleartext-Password',
        op: ':=',
        value: password,
      });

      const saveRadCheck = await this.radCheckRepository.save(radcheckCreate);
      // Se verifica que la entrada haya sido creada exitosamente.
      if (!saveRadCheck) {
        const str = `Hubo un error al guardar los datos del usuario/onu: ${username} en la tabla "radcheck"\n.`;
        console.log(`${str}`);
        msj += str

        const err = new Error(str);
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              error: str,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
            {
              cause: err,
            },
          );
      }
      console.log(`\nExito al registrar el RADCHECK`);
      }

      /////////////////////////////////////////////////////////////////////////////
      //       RADUSERGROUP                                                      //
      /////////////////////////////////////////////////////////////////////////////

      console.log(`Registrando usergroup de ${username}`);

      //* Se realiza la busqueda de username con usergroup *//
      const isRadduser = await this.radUserGroupRepository.findBy({ username, groupname: Not("suspendido") });

      if( isRadduser?.length > 0 ){
        // Solo debe haber una entrada, si hay mas se envia un msj de alerta.
        if (isRadduser?.length > 1) {
          const alerta = `ALERTA: Existen múltiples entradas para el username: ${username}, donde el ‘groupname‘ no es ‘suspendido’. Posiblemente suscrito a más de un plan \nPOR FAVOR ALERTAR A INGIENERIA.\n`;
          console.log(alerta);
          msj += alerta;
        }// Se verifica que los planes coincidan.
        else if (!(isRadduser[0].groupname === groupname)) {
          const str = `Ya existe una entrada en 'radusergroup' pero los planes no coinciden, se procede a actualizar`;
          console.log(str);
          msj += str
          isRadduser[0].groupname = groupname;
          const userGrooupActulized = await this.radUserGroupRepository.save(isRadduser);
          // Verifica la actualización.
          if (!userGrooupActulized) {
            const str = `Actualizacion de 'radusergroup' para username:${username} fallida.\n`;
            msj += str
            console.log(str);
          }
          else {
            const str = `Actualizacion de 'radusergroup' para username:${username} exitosa.\n`;
            msj += str
            console.log(str);
          }
        }// Si lo planes coinciden no se realiza ninguna operación.
        else {
          const str = `Ya existía una entrada en 'radusergroup' para username:${username}. Los planes coinciden.\n`;
          msj += str
          console.log(str);
        }
      }//* Si no existe la entrada en la tabla. *//
      else {
        const usergroup = await this.radUserGroupRepository.create({
          username: username,
          groupname: groupname,
          priority: priority ? priority : 10,
        });
  
        const saveUserGroup = await this.radUserGroupRepository.save(usergroup);
  
        //* Verifica que la entrada se haya guardado exitosamente *//
        if (!saveUserGroup) {
          const str = `Hubo un error al guardar los datos del usuario/onu ${username} en la tabla "radusergroup".`;
          console.log(`------------------------------------------------\n`);
  
          const err = new Error(str);
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              error: str,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
            {
              cause: err,
            },
          );
        }
      }

      console.log(`Usuario/onu ${username} registrado exitosamente`);
      console.log(`------------------------------------------------\n`);

      user.message = msj;
      return user;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Devuelve un array/lista con todas las entradas encontradas.
   * @returns { Array }
   */
  async FindAllUsers(n: number, t:number): Promise<UserInfo[]> {
    const date = new Date();
    console.log(`Se inicia busqueda de usuarios, página ${n}.\nFecha: ${date}\n`);

    if (n < 1) {
      const str = `Número de página inválido.`;
      const err = new Error()
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: str,
        },
        HttpStatus.NOT_FOUND,
        {
          cause: err,
        },
      );
    }
    /////////////////////////////////////////////////////////////////////
    try {
      const skip = (n - 1) * 20;
      const users = await this.usersRepository.find({
        take: t,
        skip
      });

      if (users?.length < 1) {
        const str = 'No se encontraron usuarios/onu';
        console.log(`------------------------------------------------\n`);

        const err = new Error(str);
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: str,
          },
          HttpStatus.NOT_FOUND,
          {
            cause: err,
          },
        );
      }

      console.log(
        `Se encontraron ${users.length} usuarios/onus \n------------------------------------------------\n`,
      );
      return users;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Devuelve el número total de entradas en la base de datos.
 * @returns { number }
 */
async GetTotalEntries(): Promise<number> {
  const date = new Date();
  console.log(`Se inicia búsqueda del número total de entradas.\nFecha: ${date}\n`);

  try {
    const totalEntries = await this.usersRepository.count();
    console.log(`Número total de entradas: ${totalEntries}\n------------------------------------------------\n`);
    return totalEntries;
  } catch (error) {
    console.error(error);
    console.log(`------------------------------------------------\n`);
    throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}


  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Buscan una entrada en la tbla 'userinfo' a traves del id.
   * @param id { number }
   * @returns { UserInfo }
   */
  async FindById(id: number) {
    try {
      const date = new Date();
      console.log(`\nFecha: ${date}\n`)
      console.log(`Bucando usuario/onu con id: ${id}`);
      const users = await this.usersRepository.findOneBy({ id: id });

      if (!users) {
        const str = `No se econtro usuario/onu con id: ${id}`;
        console.log(`------------------------------------------------\n`);

        const err = new Error(str);
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: str,
          },
          HttpStatus.NOT_FOUND,
          {
            cause: err,
          },
        );
      }

      const radusergroups = await this.radUserGroupRepository.find({
        where: {
          username: users.username,
        },
      });
  
      console.log(
        `Usuario/onu encontrado!\n------------------------------------------------\n`,
      );
      return {
        user: users,
        radusergroups,
      };
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Buscan una entrada en la tbla 'userinfo' a traves del id.
   * @param id { number }
   * @returns { UserInfo }
   */
  async FindByUsername(username: string) {
    try {
      const date = new Date();
      console.log(`\nFecha: ${date}\n`)
      console.log(`Bucando usuario/onu con username: ${username}`);
      const users = await this.usersRepository.findOneBy({ username: username });

      if (!users) {
        const str = `No se econtro usuario/onu con id: ${username}`;
        console.log(`------------------------------------------------\n`);

        const err = new Error(str);
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: str,
          },
          HttpStatus.NOT_FOUND,
          {
            cause: err,
          },
        );
      }

      const radusergroups = await this.radUserGroupRepository.find({
        where: {
          username
        },
      });
  
      console.log(
        `Usuario/onu encontrado!\n------------------------------------------------\n`,
      );
      return {
        user: users,
        radusergroups,
      };
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Buscan una entrada en la tbla 'userinfo' a traves del username, 
   * devuelve True si no esta en uso y False al contrario.
   * Permite verificar que un username no este duplicado.
   * @param id { number }
   * @returns { UserInfo }
   */
  async UsernameInUse(username: string) {
    try {
      const date = new Date();
      console.log(`\nFecha: ${date}\n`)
      console.log(`Bucando usuario/onu con username: ${username}`);
      const users = await this.usersRepository.findOneBy({ username: username });

      if (!users) {
        console.log(
          `Username libre! Retornando True\n------------------------------------------------\n`,
        );
        return true;

      }

      console.log(
        `Usuario/onu encontrado! Retornando False\n------------------------------------------------\n`,
      );
      return false;

    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Buscan una entrada en la tbla 'userinfo' a traves del id.
   * @param id { number }
   * @returns { UserInfo }
   */
  async FindUsernames(username: string) {
    try {
      const date = new Date();
      console.log(`\nFecha: ${date}\n`)
      console.log(`Bucando usuario/onu con username: ${username}`);
      const users = await this.usersRepository.findBy({ username: ILike(`%${username}%`), });

      if (!users) {
        const str = `No se econtro usuario/onu con id: ${username}`;
        console.log(`------------------------------------------------\n`);

        const err = new Error(str);
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: str,
          },
          HttpStatus.NOT_FOUND,
          {
            cause: err,
          },
        );
      }
  
      console.log(
        ` ${users?.length} usuarios/onus encontrado!\n------------------------------------------------\n`,
      );
      return {
        users
      };
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Permite modificar una entrada de la tabla 'userinfo'.
   * Si la entrada no existe la operación es rechazada.
   * @param id { number }
   * @param data { UserUpdateDto }
   * @returns { UserInfo }
   */
  async UpdateUserInfo(id: number, data: UserUpdateDto) {
    const date = new Date();
    console.log(`Se inicia actualización de usuario de usuario.\nFecha: ${date}\n`);

    let flag = false;
    for (const obj in data) {
      if (obj) {
        console.log(obj)
        flag = true;
        break;
      }
    }

    if(!flag){
      const str = `No hay datos a modificar.`;
      console.log(`${str}\n------------------------------------------------\n`);
      return str;
    }

    try {
      console.log(`Actualizando al usuario: ${data.username}`);

      const User = await this.usersRepository.findOneBy({ id });

      if (!User) {
        const str = `El username/onu: ${data.username} no está asignada o no existe.`;
        console.log(`------------------------------------------------\n`);

        const err = new Error(str);
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: str,
          },
          HttpStatus.NOT_FOUND,
          {
            cause: err,
          },
        );
      }

      // Se evalúa si uno o más campos serán modificados.
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

      const updateUser = await this.usersRepository.save(User);

      if (!updateUser) {
        const str = `No se pudo actualizar la username/onu : ${data.username}`;
        console.log(`------------------------------------------------\n`);

        const err = new Error(str);
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: str,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
          {
            cause: err,
          },
        );
      }

      return updateUser;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Permite eliminar a un usuario de la tres tablas usadas para ser creado.
   * En sintesis es el opuesto de CreateUser.
   * Usa el username para eliminar al usuario, si por alguna razón la entrada no existe en alguna de las tablas no genera error y se pasa a la operación siguiente.
   * @param username { string }
   */
  async DeleteByUsername(username: string) {
    const date = new Date();
    console.log(`Se inicia eliminacion de usuario ${username} de la BD.\nFecha: ${date}\n`);
    try{
      //const user = await this.usersRepository.findBy({ username });
      await this.usersRepository.delete({ username });
      await this.radUserGroupRepository.delete({ username });
      await this.radCheckRepository.delete({ username });

      console.log('Borrado exitoso');
      console.log(`------------------------------------------------\n`);
    }
    catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
