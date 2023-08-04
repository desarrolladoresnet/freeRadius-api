/* eslint-disable prettier/prettier */
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
// import { CreateServiceDto } from '../dto/create-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../database/service.entity';
import { ZonaCliente } from 'src/database/node.entity';
import { System } from 'src/database/system.entity';
import { SystemsService } from 'src/systems/systems.service';
import { CoaService } from 'src/coa/coa.service';
import { Plan } from 'src/database/plan.entity';
import { RadUserGroup } from 'src/database/radusergroup.entity';
import { UserInfo } from 'src/database/user.entity';
import { UpdateServiceDto } from 'src/dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
    @InjectRepository(UserInfo)
    private userinfoRepository: Repository<UserInfo>,
    @InjectRepository(RadUserGroup)
    private radUserGroupRepository: Repository<RadUserGroup>,
    @InjectRepository(ZonaCliente)
    private nodesRepository: Repository<ZonaCliente>,
    @InjectRepository(System)
    private systemsRepository: Repository<System>,
    @InjectRepository(Plan)
    private plansRepository: Repository<Plan>,
    private sysServices: SystemsService,
    private coaServices: CoaService,
  ) {}

  private readonly services: Service[] = [];

  /////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Crea una nueva entrada en la tabla, el id de Radius es opcional dado que es probable que exista en Wisphub pero no en Radius en un primer momento.
   * @param service { Service }
   * @returns { object }
   */
  async create(service: Service) {
    const { sys, clientId, radiusId, plan } = service;

    try {
      //* Crando tabla *//
      console.log(
        `Creado nueva entrada en la tabla 'service' con los valores: sys: ${sys}, clientId: ${clientId}, radiusId: ${radiusId} y plan: ${plan}.`,
      );
      const serviceNew = await this.servicesRepository.create({
        sys,
        clientId,
        radiusId,
        plan,
      });

      //* Salvando tabla y verificación *//
      const serviceSave = await this.servicesRepository.save(serviceNew);
      if (!serviceSave) {
        const str = `Hubo un problema para salvar el servicio`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
      }

      console.log(
        `Servicio creado exitosamente.\n------------------------------------------------\n`,
      );
      return serviceSave;
    } catch (error) {
      console.log(error);
      console.log(
        '------------------------------------------------------------------------------',
      );
      return error;
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////

  async findAll() {
    try {
      console.log(`Buscando entradas en 'services`);
      const services = await this.servicesRepository.find({
        relations: ['sys', 'plan'],
      });

      if (services.length < 1) {
        const str = `No se encontraron servicios.`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
      }

      console.log(
        `Se encontraron ${services?.length} servicios.\n------------------------------------------------\n`,
      );
      return services;
    } catch (error) {
      console.log(error);
      console.log(
        '------------------------------------------------------------------------------',
      );
      return error;
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Encuentra una entrada en services mediante el id
   * @param id { number }
   * @returns { object }
   */
  async findOne(id: number) {
    //console.log((await this.servicesRepository.findOne({where:{ id }, relations:['sys','plan']})).plan['id'])
    try {
      console.log(`Buscando entradas en 'services con el id: ${id}`);
      const services = await this.servicesRepository.findOne({
        where: { id },
        relations: ['sys', 'plan'],
      });

      if (!services) {
        const str = `No se encontro un servicio con el id: ${id}.`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
      }

      console.log(
        `Servicio encontrado.\n------------------------------------------------\n`,
      );
      return services;
    } catch (error) {
      console.log(error);
      console.log(
        '------------------------------------------------------------------------------',
      );
      return error;
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Buca el cliente  por id y se trae informacion del cliente en Wisphub.
   * @param id
   * @returns
   */
  async findOneOnSys(id: number): Promise<any | null> {
    try {
      console.log(`Buscando informacion en service de la entrada ${id}`);
      const serv = await this.servicesRepository.findOne({
        where: { id },
        relations: ['sys', 'plan'],
      });
      const sys = serv.sys;
      const ep = sys['endPoint'];
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const superagent = require('superagent');
      const find = await superagent
        .get(`${ep}${serv.clientId}`)
        .set('authorization', `Api-Key ${sys['apiKey']}`)
        .set('content-type', 'application/json')
        .then((res) => res.body);

      if (!find) {
        const str = `No se encontro informacion relativo al servicio con el id: ${id}.`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
      }

      console.log(
        `Servicio encontrado.\n------------------------------------------------\n`,
      );
      return find;
    } catch (err) {
      console.log(err);
      throw new HttpException('No se encontró', HttpStatus.NOT_FOUND);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Revisa la tabla de nodos para ver en que sistema se encuentra un nodo.
   * @param node
   * @returns
   */
  async sync(node: string) {
    try {
      const nodeSys = await this.nodesRepository.findOne({
        where: { name: node },
        relations: ['systems'],
      });
      const sys = nodeSys['systems'];
      sys.forEach(async (i) => {
        //Para cada sistema del nodo encuentra la lista de clientes en ese nodo
        const sysOnNode = await this.sysServices.SysNode(i.id, node);
        //console.log(sysOnNode)
        //Encuentra los elementos de userinfo que tienen como address ese nodo
        const userinfoNodes = await this.userinfoRepository.find({
          where: { address: node },
        });
        //para cada uno de esos elementos...
        userinfoNodes.forEach(async (o) => {
          if (
            await this.radUserGroupRepository.find({
              where: { username: o.username, priority: 0 },
            })
          ) {
            console.log('entró aunque está vacío');
          }
          //console.log(await this.radUserGroupRepository.find({where:{username:o.username,priority:0}}))
          //... encuentra el servicio que corresponda
          const userService = await this.servicesRepository.findOne({
            where: { radiusId: o.id },
          });
          sysOnNode.forEach(async (u) => {
            if (u['id_servicio'] == userService.clientId) {
              //Ubícalo en la lista de clientes del nodo
              const compServ = u;
              //encuentra el/los grupo/s:
              if (compServ['estado'] == 'Suspendido') {
                if (
                  await this.radUserGroupRepository.find({
                    where: { username: o.username, priority: 0 },
                  })
                ) {
                } else {
                  this.update(userService.id, { status: 2 });
                  this.coaServices.SuspendUser(o.username);
                }
              } else if (compServ['estado'] == 'Cancelado') {
                if (
                  await this.radUserGroupRepository.find({
                    where: { username: o.username, groupname: 'cancelado' },
                  })
                ) {
                } else {
                  this.update(userService.id, { status: 3 });
                  this.coaServices.ChangePlan({
                    username: o.username,
                    newgroupname: 'cancelado',
                  });
                }
              } else {
                //revisar si no estaba suspendido o cancelado en la tabla de servicios
                if (userService.status != 1 && userService.status != 4) {
                  this.coaServices.ActivateUser(o.username);
                }
                //encontrar listname del plan del servicio
                const plan = await this.plansRepository.findOne({
                  where: { name: compServ['plan_internet']['nombre'] },
                });
                if (userService.plan['id'] != plan.id) {
                  this.update(userService.id, {
                    plan: [
                      { id: plan.id, listName: plan.listName, name: plan.name },
                    ],
                  });
                  this.coaServices.ChangePlan({
                    username: o.username,
                    newgroupname: plan.listName,
                  });
                }
              }
            }
          });
        });
      });
      return `Nodo ${node} sincronizado`;
    }
    catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return error;
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Realiza update de una entrada mediante el id.
   * Si no hay valores para realizar el update se rechaza la peticion.
   * @param id 
   * @param updateServDto 
   * @returns 
   */
  async update(id: number, updateServDto: UpdateServiceDto) {
    const { sys, clientId, radiusId, status, plan } = updateServDto;

    //* Verificacion de valores para modificar *//
    if (!sys && !clientId && !radiusId && status && !plan ){
      const str = `No se encontro informacion relativo al servicio con el id: ${id}.`;
      console.log(
        `${str}\n------------------------------------------------\n`,
      );
    }

    //* Se incia la modificación *//
    try {
      console.log(`Realizando update del service ${id}`);
      const update = await this.servicesRepository.update(id, updateServDto);

      //* Verificación de update *//
      if (!update) {
        const str = `No se pudo realizar update al servicio con el id: ${id}.`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
      }

      console.log(`Servicio actualizado exitosamente.
      \n------------------------------------------------\n`);
      return update;
    }
    catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return error;
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Elimina una entrada en service mendiante el id.
   * @param id
   */
  async remove(id: number) {
    try {
      console.log(`Eliminando entrada en service con el id. ${id}`);

      const del = await this.servicesRepository.delete(id);

      if (!del) {
        const str = `hubo un problema al eliminar la entrada`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
      }

      console.log(`Servicio eliminado exitosamente.
      \n------------------------------------------------\n`);
      return del;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return error;
    }
  }
}
