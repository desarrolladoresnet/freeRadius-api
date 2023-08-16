/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config'
//* IMPORTACIONES VARIAS *//
import { Repository } from 'typeorm';
import { exec } from 'child_process';
import { promisify } from 'util';
import { RadusergroupService } from 'src/radusergroup/radusergroup.service';
import { ChangePlanDto, CoaDto } from 'src/dto/coa.dto';
//* ENTIDADES *//
import { Nas } from 'src/database/nas.entity';
import { Radacct } from 'src/database/radacct.entity';
import { UserInfo } from 'src/database/user.entity';
import { RadGroupReply } from 'src/database/radgroupreply.entity';

@Injectable()
export class CoaService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userInfo: Repository<UserInfo>,
    @InjectRepository(Radacct)
    private readonly radacctRepository: Repository<Radacct>,
    @InjectRepository(Nas)
    private readonly nasRepository: Repository<Nas>,
    @InjectRepository(RadGroupReply)
    private readonly radGroupRepository: Repository<RadGroupReply>,
    private readonly userGroupService: RadusergroupService,
    private configService: ConfigService
    ) {}
    
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

  /**
   * Inserta los comandos a la terminal unix.
   * @param echoCommand {string}
   * @param radClientCommand {string}
   * @returns { string }
   */
  async CoA_cmd(
    echoCommand: string,
    radClientCommand: string,
  ): Promise<string> {
    const execAsync = promisify(exec);
    try {
      const { stdout } = await execAsync(
        `${echoCommand} | ${radClientCommand}`,
      );
      console.log('Command output:', stdout);
      return stdout;
    } catch (error) {
      // console.log(error);
      // //console.error('Error executing the command:', error.message);
      // console.log(
      //   '------------------------------------------------------------------------------',
      // );
      if (error.stdout.includes('Session-Context-Not-Found')){
        return "CoA-ACK, El usuario no estaba activo"
      }
      throw error;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /**
   * Verefica que el comando se haya ejecutado exitosamente.
   * @param response {string} Toma la Respuesta del CoA y evalua si fue exitosa.
   * @returns { boolean }
   */
  CoA_Status(response: string) {
    if (!(typeof response === 'string')) return false; // Failsafe por si falla el coa
    const str = response.toLowerCase();
    return str.includes('coa-ack');
  }
  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  echoComand(data: Array<RadGroupReply>) {
    let command = '';

    for (const str of data ){
      command +=`,${str.attribute}=${str.value}`
    }

    return command;
  }
  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  /**
   * para activar el usuario en radius, se toma el username de la ONU asignada y se busca en la BD, tambien el "nasipaddress" y su "secret".
   * Si todos los aprametros son encontrados se ejecuta el CoA.
   * Si el CoA es exitoso se elmina del grupo de suspendidos de "radusergroup".
   * Si en algun momento algo falla se retorna un msj de error.
   * 
   * @todo msj de error
   * @param username { string }
   * @returns Queda pendiente la respuesta
   */
  async ActivateUser(username: string) {
    try {
      const date = new Date();
      console.log(`Activando al usuario ${username}.\nFecha: ${date}\n`);
      const isUser = await this.userInfo.findOneBy({ username });
      if (!isUser) {
        const str = `No existe el username: ${username}`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
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

      //* Busqueda de Ip en radacct
      console.log(`Buscando IP`);
      const radacct = await this.radacctRepository.findOneBy({ username });
      if (!radacct) {
        const str = `El username:${username}, no pudo ser encontrado.`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
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
      const ip_address = radacct.nasipaddress;

      // Busqueda del secret
      console.log(`Localizando Secret`);
      const nas = await this.nasRepository.find({
        where: [{ nasname: ip_address }],
        order: { id: 'desc' },
        take: 1,
      });
      if (!nas) {
        const str = `No se encontro una dirección 'nas' asociada al username:${username} y su ip.`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
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
      const secret = nas[0].secret;

      //* Preparacion de los comandos para Radius.
      const echoCommand = `echo "User-Name='${username}',User-Name='${username}',NetElastic-Portal-Mode=0"`;
      const radClientCommand = `radclient -c '1' -n '3' -r '3' -t '3' -x '${ip_address}:3799' 'coa' '${secret}' 2>&1`;

      console.log(`Activando`);
      const res = await this.CoA_cmd(echoCommand, radClientCommand);
      console.log('COA Response', res);

      console.log(`Confirmando`);
      const statusCoa = this.CoA_Status(res);

      if (!statusCoa) {
        return `El usuario ${username} no pudo ser activado`;
      }

       //borrar entrada de la tabla radusergroup
      const data = { username, groupname: 'suspendido', priority: 1 };
      const eliminateSuspend = await this.userGroupService.DeleteUserGroup(
        data,
      );

      if (!eliminateSuspend) {
        const str = `El usuario no pudo ser eliminado de la tabla radusergroup`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
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

      const str = `El usuario "${username} fue activado con exito"`;
      console.log(`${str}\n------------------------------------------------\n`);
      return str;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /**
   * Para Suspender el usuario en radius, se toma el username de la ONU asignada y se busca en la BD, tambien el "nasipaddress" y su "secret".
   * Si todos los aprametros son encontrados se ejecuta el CoA.
   * Si el CoA es exitoso se agrega  al grupo de suspendidos de "radusergroup".
   * Si en algun momento algo falla se retorna un msj de error.
   * 
   * @todo msj de error
   * @param username { string }
   * @returns Queda pendiente la respuesta
   */
  async SuspendUser(username: string) {
    
      //* Preparacion de comandos para Radius. *//
    try {
      /*
       * Busqueda de usuario en BD.
       */
      const date = new Date();
      console.log(`Suspendiendo al usuario ${username}.\nFecha: ${date}\n`);
      const isUser = await this.userInfo.findOneBy({ username });
      if (!isUser) {
        const str = `No existe el username: ${username}`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
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

      /*
       * Busqueda de Ip en radacct.
       */
      console.log(`Bucando IP`);
      const radacct = await this.radacctRepository.findOneBy({ username });
      if (!radacct) {
        const str = `El username:${username}, no pudo ser encontrado en la tabla radacct.`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
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
      const ip_address = radacct.nasipaddress;

      //* Busqueda del secret es tabla nas. *//
      const nas = await this.nasRepository.find({
        where: [{ nasname: ip_address }],
        order: { id: 'desc' },
        take: 1,
      });
      if (!nas) {
        const str = `No se encontró una direccion nas aosciada al username:${username} y su ip.`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
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
      const secret = nas[0].secret;

      const url_suspension = this.configService.get<string>('URL_SUSPENSION') || 'http://10.10.20.7/avisodecorte';
      const acl_suspension = this.configService.get<string>('ACL_SUSPENSION') || 'suspendido';

      console.log(`URL ${url_suspension}\nACL ${acl_suspension}`)
      //* Preparacion de comandos para Radius. *//
      const echoCommand = `echo "User-Name='${username}',User-Name='${username}',NetElastic-Portal-Mode=1,NetElastic-HTTP-Redirect-URL='${url_suspension}',Filter-Id='${acl_suspension}'"`;
      const radClientCommand = `radclient -c '1' -n '3' -r '3' -t '3' -x '${ip_address}:3799' 'coa' '${secret}' 2>&1`;

      console.log(`Suspendiendo`);
      const res = await this.CoA_cmd(echoCommand, radClientCommand);
      console.log('COA Response', res);

      /**
       * Compara string recibido de la terminal Linux con string esperado.
       * Retornal bool.
       */
      const statusCoa = this.CoA_Status(res);
      if (!statusCoa) {
        const str = `No se pudo suspender al usuario ${username}`;
        console.log(`${str}\n------------------------------------------------\n`);
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

      const data = { username, groupname: 'suspendido', priority: 1 };

      const userGroup = await this.userGroupService.CreateRadUserGroup(data);
      console.log("usergoup: ",userGroup);
      if (!userGroup) {
        const str = `No se pudo suspender al usuario ${username} en la tabla "radusergroup"`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
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
      return `El usuario ${username} fue suspendido exitosamente`;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

    /**
   * Se verifica la existencia del usuario, se busca su "nasipaddress" y "secret".
   * Si todos los parametros son encontrados se ejecuta el CoA.
   * Si el CoA es exitoso se elmina del grupo de suspendidos de "radusergroup".
   * Si en algun momento algo falla se retorna un msj de error.
   * 
   * @todo msj de error
   * @param data { ChangePlanDto } viene con dos string, username con nombre de la ONU y "groupname" con el nuevo plan.
   * @returns Queda pendiente la respuesta
   */
  async ChangePlan(data: ChangePlanDto) {
    const { username, newgroupname } = data;
    const date = new Date();
    console.log(`Cambiando el plan al usuario: ${username}.\nFecha: ${date}\n`);
    // Verifica que no hayan campos vacios.
    try {
      if (!username || !newgroupname) {
        const str = `Verificar username: ${username} y newgroupname: ${newgroupname}.`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        const err = new Error(str);
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: str,
          },
          HttpStatus.BAD_REQUEST,
          {
            cause: err,
          },
        );
      }

      /*
       * Busqueda del value del plan en RadGroupRepository
       */

      const groupValue = await this.radGroupRepository.findBy({ groupname: newgroupname });
      if(groupValue?.length < 1) {
        const str = `No se encontraron planes con el groupname: ${newgroupname}.`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        const err = new Error(str);
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: str,
          },
          HttpStatus.BAD_REQUEST,
          {
            cause: err,
          },
        );
      }

      console.log(`Se encontraron ${groupValue?.length} para ${newgroupname}.`)

      /*
       * Busqueda de usuario en BD
       */
      console.log(`Modificando el plan del usuario ${username}`);
      const isUser = await this.userInfo.findOneBy({ username });
      if (!isUser) {
        const str = `No existe el username: ${username}`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
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

      /*
       * Busqueda de Ip en radacct
       */
      console.log(`Bucando IP`);
      const radacct = await this.radacctRepository.findOneBy({ username });
      if (!radacct) {
        const str = `El username:${username}, no pudo ser encontrado en la tabla radacct.`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
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
      const ip_address = radacct.nasipaddress;

      //* Busqueda del secret
      const nas = await this.nasRepository.find({
        where: [{ nasname: ip_address }],
        order: { id: 'desc' },
        take: 1,
      });
      console.log(nas);
      if (!nas) {
        const str = `No se encontro una dirección nas asociada al username:${username} y su ip.`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
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
      const secret = nas[0].secret;

      /**
       ** Envio de comando a terminal Linux y recibe respuesta.
       */

      
      const strCommand = this.echoComand(groupValue);

      // vamos a necesitar enviar todos los atributos y su valor
      const echoCommand = `echo "User-Name=${username},User-Name=${username}${strCommand}"`;
      const radClientCommand = `radclient -c '1' -n '3' -r '3' -t '3' -x '${ip_address}:3799' 'coa' '${secret}' 2>&1`;

      console.log(`Cambiando Plan`);
      console.log(`CoA:\n${echoCommand} | ${radClientCommand}`)
      const res = await this.CoA_cmd(echoCommand, radClientCommand);
      console.log('COA Response', res);

      /**
       * Compara string recibido de la terminal Linux con string esperado.
       * Retornal bool.
       */
      const statusCoa = this.CoA_Status(res);
      if (!statusCoa) {
        const str = `No se pudo suspender al usuario ${username}`;
        console.log(`${str}\n------------------------------------------------\n`);
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

      const data = { username, groupname: newgroupname, priority: 10 };

      const userGroup = this.userGroupService.UpdateUserGroup(data);
      if (!userGroup) {
        const str = `No se pudo cambiar el plan al usuario ${username} en la tabla "radusergroup"`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
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
      return `Se realizó el cambio de plan al usuario ${username} exitosamente`;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /** Metodo para uso interno de la API, y su objetivo  es permitir enviar un mensaje CoA a un NAS para modificar  parámetros de un servicio, en vivo.
   * Se verifica la existencia del usuario, se busca su "nasipaddress" y "secret".
   * Si todos los parametros son encontrados se ejecuta el CoA.
   * Si el CoA es exitoso se elmina del grupo de suspendidos de "radusergroup".
   * Si en algun momento algo falla se retorna un msj de error.
   * 
   * @todo msj de error
   * @param data { CoaDto } Ver CoaDto en la carpeta de Ddto. 
   * @returns Queda pendiente la respuesta
   */
  async Modify(data: CoaDto) {
    try {
      const { username, attribute, value } = data;
      const date = new Date();
      console.log(`Modificando al usuario ${username}.\nFecha: ${date}\n`);
      const isUser = await this.userInfo.findOneBy({ username });
      if (!isUser) {
        const str = `No existe el username: ${username}`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
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

      /*
       * Busqueda de Ip en radacct
       */
      console.log(`Bucando IP`);
      const radacct = await this.radacctRepository.findOneBy({ username });
      if (!radacct) {
        const str = `El username:${username}, no pudo ser encontrado en la tabla radacct.`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
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
      const ip_address = radacct.nasipaddress;

      //* Busqueda del secret
      const nas = await this.nasRepository.find({
        where: [{ nasname: ip_address }],
        order: { id: 'desc' },
        take: 1,
      });
      console.log(nas);
      if (!nas) {
        const str = `No se encontró una direccion nas aosciada al username:${username} y su ip.`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
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
        );;
      }
      const secret = nas[0].secret;

      const echoCommand = `echo "User-Name=${username},User-Name=${username},${attribute}=${value}"`;
      const radClientCommand = `radclient -c '1' -n '3' -r '3' -t '3' -x '${ip_address}:3799' 'coa' '${secret}' 2>&1`;

      console.log(`Modificando`);
      const res = await this.CoA_cmd(echoCommand, radClientCommand);
      console.log('COA Response', res);

      /**
       * Compara string recibido de la terminal Linux con string esperado.
       * Retornal bool.
       */
      const statusCoa = this.CoA_Status(res);
      if (!statusCoa) {
        const str = `No se pudo suspender al usuario ${username}`;
        console.log(`${str}\n------------------------------------------------\n`);
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

      return `El usuario ${username} fue modificado exitosamente`;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

