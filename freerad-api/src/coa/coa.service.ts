import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { exec } from 'child_process';
import { Nas } from 'src/database/nas.entity';
import { Radacct } from 'src/database/radacct.entity';
import { UserInfo } from 'src/database/user.entity';
import { RadusergroupService } from 'src/radusergroup/radusergroup.service';
import { Repository } from 'typeorm';

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

  async CoA_cmd(cmd: any): Promise<string> {
    //const { cmd } = data;
    return new Promise<string>((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error al ejecutar el comando: ${error}`);
          reject(error);
        } else if (stderr) {
          console.error(`stderr: ${stderr}`);
          reject(stderr);
        } else {
          console.log(`stdout: ${stdout}`);
          resolve(stdout);
        }
      });
    });
  }

  ////////////////////////////////////////////////////////////////////////////

  async ActivateUser(username: string) {
    try {
      console.log(`Activando al usuario ${username}`);
      const isUser = await this.userInfo.findOneBy({ username });
      if (!isUser) {
        console.log(`No existe el username: ${username}`);
        console.log(`------------------------------------------------\n`);
        return `No existe el username: ${username}`;
      }

      console.log(`Buscando IP`);
      // Busqueda de Ip en radacct
      const radacct = await this.radacctRepository.findOneBy({ username });
      if (!radacct) {
        console.log(`El username:${username}, no pudo ser encontrado.`);
        console.log(`------------------------------------------------\n`);
        return `El username:${username}, no pudo ser encontrado.`;
      }
      const ip_address = radacct.nasipaddress;

      console.log(`ip: `, ip_address);

      console.log(`Localizando Secret`);
      // Busqueda del secret
      const nas = await this.nasRepository.findOneBy({
        nasname: ip_address,
      });
      if (!nas) {
        console.log(
          `No se encontro una direccion nas aosciada al username:${username} y su ip.`,
        );
        console.log(`------------------------------------------------\n`);
        return `No se encontro una direccion nas aosciada al username:${username} y su ip.`;
      }
      const secret = nas.secret;

      const cmd = `echo "User-Name='${username}',User-Name='${username}',NetElastic-Portal-Mode=0 | radclient -c '1' -n '3' -r '3' -t '3' -x '${ip_address}:3799' 'coa' '${secret}’ 2>&1`;

      console.log(`Activando`);
      const res = await this.CoA_cmd(cmd);
      console.log(res);

      const re = `Received CoA-ACK Id ^[0-9]+$ from ${ip_address}:3799`;

      console.log(`Confrimando`);
      const statusCoa = this.CoA_Status(re, re);

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
        console.log(
          `El usuario no pudo ser eliminado de la tabla radusergroup`,
        );
        console.log(`------------------------------------------------\n`);
        return `El usuario no pudo ser eliminado de la tabla radusergroup`;
      }

      console.log(`El usuario "${username} fue activado con exito"`);
      console.log(`------------------------------------------------\n`);
      return `El usuario "${username} fue activado con exito"`;
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
       * Busqueda de usuario en BD
       */
      console.log(`Supendiendo al usuario ${username}`);
      const isUser = await this.userInfo.findOneBy({ username });
      if (!isUser) {
        console.log(`No existe el username: ${username}`);
        console.log(`------------------------------------------------\n`);
        return `No existe el username: ${username}`;
      }

      /*
       * Busqueda de Ip en radacct
       */
      console.log(`Bucando IP`);
      const radacct = await this.radacctRepository.findOneBy({ username });
      if (!radacct) {
        console.log(`El username:${username}, no pudo ser encontrado en la tabla radacct.`);
        console.log(`------------------------------------------------\n`);
        return `El username:${username}, no pudo ser encontrado radacct.`;
      }
      const ip_address = radacct.nasipaddress;

      // Busqueda del secret
      const nas = await this.nasRepository.findOneBy({
        nasname: ip_address,
      });
      if (!nas) {
        console.log(
          `No se encontro una direccion nas aosciada al username:${username} y su ip.`,
        );
        console.log(`------------------------------------------------\n`);
        return `No se encontro una direccion nas aosciada al username:${username} y su ip.`;
      }
      const secret = nas.secret;

      //TODO: crear Tablas para estos valores
      const url_suspension = 'http://10.10.20.7/avisodecorte';
      const acl_suspension = 'suspendido';

      const cmd = `"User-Name='${username}',User-Name='${username}',NetElastic-Portal-Mode=1,NetElastic-HTTP-Redirect-URL='${url_suspension}',Filter-Id='${acl_suspension}'" | radclient -c '1' -n '3' -r '3' -t '3' -x '${ip_address}:3799' 'coa' '${secret}’ 2>&1`;

      /**
       * Envio de comando a terminal Linux y recibe respuesta.
       */
      // const res = await this.CoA_cmd(cmd);
      // console.log('Respuesta de terminal', res);

      const re = `Received CoA-ACK Id ^[0-9]+$ from ${ip_address}:3799`;

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
        console.log(
          `No se pudo suspender al usuario ${username} en la tabla "radusergroup"`,
        );
        console.log(`------------------------------------------------\n`);
        return `No se pudo suspender al usuario ${username} en la tabla "radusergroup"`;
      }
      return `El usuario ${username} fue suspendido exitosamente`;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return error;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////

  CoA_Status(response: string, str: string) {
    const x = response.split(' ');
    const y = str.split(' ');

    return x[0] == y[0] && x[1] == y[1] && x[5] == y[5];
  }
}


/*
@Injectable()
export class CoaService {
  async CoA_cmd(data: any) {
    const { cmd } = data;

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.log(error);
      } else {
        console.log(stdout);
				return stdout;
      }
    });
  }
}
*/
