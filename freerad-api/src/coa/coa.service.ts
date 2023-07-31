import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nas } from 'src/database/nas.entity';
import { Radacct } from 'src/database/radacct.entity';
import { UserInfo } from 'src/database/user.entity';
import { RadusergroupService } from 'src/radusergroup/radusergroup.service';
import { Repository } from 'typeorm';
import { exec } from 'child_process';
import { promisify } from 'util';
import { ChangePlanDto, CoaDto } from 'src/dto/coa.dto';

@Injectable()
export class CoaService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userInfo: Repository<UserInfo>,
    @InjectRepository(Radacct)
    private readonly radacctRepository: Repository<Radacct>,
    @InjectRepository(Nas)
    private readonly nasRepository: Repository<Nas>,
    private readonly userGroupService: RadusergroupService,
  ) {}

  /**
   * Inserta los comandos a la terminal unix.
   * @param echoCommand
   * @param radClientCommand
   * @returns
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
      console.log(error);
      //console.error('Error executing the command:', error.message);
      console.log(
        '------------------------------------------------------------------------------',
      );
      return error;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////

  /**
   * Verefica que el comando se haya ejecutado exitosamente.
   * @param response
   * @returns boolean
   */
  CoA_Status(response: string) {
    if (!(typeof response === 'string')) return false; // Failsafe por si falla el coa
    const str = response.toLowerCase();
    return str.includes('coa-ack');
  }

  ////////////////////////////////////////////////////////////////////////////

  async ActivateUser(username: string) {
    try {
      console.log(`Activando al usuario ${username}`);
      const isUser = await this.userInfo.findOneBy({ username });
      if (!isUser) {
        const str = `No existe el username: ${username}`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
      }

      //* Busqueda de Ip en radacct
      console.log(`Buscando IP`);
      const radacct = await this.radacctRepository.findOneBy({ username });
      if (!radacct) {
        const str = `El username:${username}, no pudo ser encontrado.`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
      }
      const ip_address = radacct.nasipaddress;

      console.log(`Localizando Secret`);
      // Busqueda del secret
      const nas = await this.nasRepository.find({
        where: [{ nasname: ip_address }],
        order: { id: 'desc' },
        take: 1,
      });
      if (!nas) {
        const str = `No se encontro una direccion nas aosciada al username:${username} y su ip.`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
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

      /**
       * borrar entrada de la tabla radusergroup
       */
      const data = { username, groupname: 'suspendido', priority: 1 };
      const eliminateSuspend = await this.userGroupService.DeleteUserGroup(
        data,
      );

      if (!eliminateSuspend) {
        const str = `El usuario no pudo ser eliminado de la tabla radusergroup`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
      }

      const str = `El usuario "${username} fue activado con exito"`;
      console.log(`${str}\n------------------------------------------------\n`);
      return str;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return error;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////

  async SuspendUser(username: string) {
    try {
      /*
       * Busqueda de usuario en BD.
       */
      console.log(`Supendiendo al usuario ${username}`);
      const isUser = await this.userInfo.findOneBy({ username });
      if (!isUser) {
        const str = `No existe el username: ${username}`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
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
        return str;
      }
      const ip_address = radacct.nasipaddress;

      //* Busqueda del secret es tabla nas.
      const nas = await this.nasRepository.find({
        where: [{ nasname: ip_address }],
        order: { id: 'desc' },
        take: 1,
      });
      if (!nas) {
        const str = `No se encontro una direccion nas aosciada al username:${username} y su ip.`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
      }
      const secret = nas[0].secret;

      //TODO: crear Tablas para estos valores
      const url_suspension = 'http://10.10.20.7/avisodecorte';
      const acl_suspension = 'suspendido';

      //* Preparacion de comandos para Radius.
      const echoCommand = `echo "User-Name='${username}',User-Name='${username}',NetElastic-Portal-Mode=1,NetElastic-HTTP-Redirect-URL='${url_suspension}',Filter-Id='${acl_suspension}'"`;
      const radClientCommand = `radclient -c '1' -n '3' -r '3' -t '3' -x '${ip_address}:3799' 'coa' '${secret}' 2>&1`;

      console.log(`Suspendiendo`);
      const res = await this.CoA_cmd(echoCommand, radClientCommand);
      console.log('COA Response', res);

      /**
       * Compara string recibido de la terminal Linux con string esperado.
       * Retornal bool.
       */
      // const statusCoa = this.CoA_Status(res, re);
      // if (!statusCoa) {
      //   console.log(`No se pudo suspender al usuario ${username}`);
      //   console.log(`------------------------------------------------\n`);
      //   return `No se pudo suspender al usuario ${username}`;
      // }

      const data = { username, groupname: 'suspendido', priority: 1 };

      const userGroup = this.userGroupService.CreateRadUserGroup(data);
      if (!userGroup) {
        const str = `No se pudo suspender al usuario ${username} en la tabla "radusergroup"`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
      }
      return `El usuario ${username} fue suspendido exitosamente`;
    } catch (error) {
      console.log(
        `${error}\n------------------------------------------------\n`,
      );
      return error;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////

  async ChangePlan(data: ChangePlanDto) {
    const { username, newgroupname } = data;

    try {
      if (!username || !newgroupname) {
        const str = `Verificar username: ${username} y newgrpouname: ${newgroupname}.`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
      }

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
        return str;
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
        return str;
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
        const str = `No se encontro una direccion nas aosciada al username:${username} y su ip.`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
      }
      const secret = nas[0].secret;

      /**
       ** Envio de comando a terminal Linux y recibe respuesta.
       */

      const echoCommand = `echo "User-Name=${username},User-Name=${username},NetElastic-QoS-Profile-Name=10"`;
      const radClientCommand = `radclient -c '1' -n '3' -r '3' -t '3' -x '${ip_address}:3799' 'coa' '${secret}' 2>&1`;

      console.log(`Cambiando Plan`);
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
        return str;
      }

      const data = { username, groupname: newgroupname, priority: 10 };

      const userGroup = this.userGroupService.UpdateUserGroup(data);
      if (!userGroup) {
        const str = `No se pudo cambiar el plan al usuario ${username} en la tabla "radusergroup"`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
      }
      return `Se realizo el cambio de plan al usuario ${username} exitosamente`;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return error;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////

  async Modify(data: CoaDto) {
    try {
      const { username, attribute, value } = data;

      console.log(`Modificando al usuario ${username}`);
      const isUser = await this.userInfo.findOneBy({ username });
      if (!isUser) {
        const str = `No existe el username: ${username}`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
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
        return str;
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
        const str = `No se encontro una direccion nas aosciada al username:${username} y su ip.`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
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
      // const statusCoa = this.CoA_Status(res);
      // if (!statusCoa) {
      //   const str = `No se pudo suspender al usuario ${username}`;
      //   console.log(`${str}\n------------------------------------------------\n`);
      //   return str;
      // }

      return `El usuario ${username} fue modificado exitosamente`;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return error;
    }
  }
}

