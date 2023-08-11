/* eslint-disable prettier/prettier */
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateServiceDto } from 'src/dto/update-service.dto';
import { CoaService } from 'src/coa/coa.service';
import { SystemsService } from 'src/systems/systems.service';
// import { CreateServiceDto } from '../dto/create-service.dto';
//* EMTIDADES *//
import { Service } from '../database/service.entity';
import { ZonaCliente } from 'src/database/node.entity';
import { System } from 'src/database/system.entity';
import { RadUserGroup } from 'src/database/radusergroup.entity';
import { UserInfo } from 'src/database/user.entity';
import { Plan } from 'src/database/plan.entity';

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

  //private readonly services: Service[] = [];

  /////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Crea una nueva entrada en la tabla, el id de Radius es opcional dado que es probable que exista en Wisphub pero no en Radius en un primer momento.
   * @param service { Service }
   * @returns { object }
   */
  async CreateService(service: Service) {
    const { sys, clientId, radiusId, plan, status } = service;

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
        status: status ? status : 1,
      });

      //* Salvando tabla y verificación *//
      const serviceSave = await this.servicesRepository.save(serviceNew);
      if (!serviceSave) {
        const str = `Hubo un problema para guardar el servicio`;
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

      console.log(
        `Servicio creado exitosamente.\n------------------------------------------------\n`,
      );
      return serviceSave;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      return error;
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Trae toda las entradas en la tabla services.
   * @returns { Array }
   */
  async FindAllServices() {
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
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Encuentra una entrada en services mediante el id
   * @param id { number }
   * @returns { object }
   */
  async FindOnService(id: number) {
    //console.log((await this.servicesRepository.findOne({where:{ id }, relations:['sys','plan']})).plan['id'])
    try {
      console.log(`Buscando entradas en 'services' con el id: ${id}`);
      const services = await this.servicesRepository.findOne({
        where: { id },
        relations: ['sys', 'plan'],
      });

      if (!services) {
        const str = `No se encontró un servicio con el id: ${id}.`;
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
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Buca el cliente  por id y se trae informacion del cliente en Wisphub.
   * @param id
   * @returns
   */
  async FindOneOnSys(id: number): Promise<any | null> {
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
        const str = `No se encontro información relativa al servicio con el id: ${id}.`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
      }

      console.log(
        `Servicio encontrado.\n------------------------------------------------\n`,
      );
      return find;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Revisa la tabla de nodos para ver en que sistema se encuentra un nodo.
   * @param node
   * @returns
   */
  async SyncService(node: string) {
    console.log(`Buscando nodo ${node}`);
    try {
      const nodeSys = await this.nodesRepository.findOne({
        where: { name: node },
        relations: ['systems'],
      });
      const sys = nodeSys['systems'];
      const userinfoNodes = await this.userinfoRepository.find({
        where: { address: node },
      });
      //Si existen clientes en la tabla userinfo
      if (userinfoNodes.length > 0) {
        // Por cada sistema que aloje el nodo ${node}
        sys.forEach(async (i) => {
          const sysOnNode = await this.sysServices.SysNode(i.id, node);
          // Para cada uno de los clientes de userinfo
          userinfoNodes.forEach(async (o) => {
            if (
              await this.radUserGroupRepository.find({
                where: { username: o.username, priority: 0 },
              })
            ) {
              console.log('entró aunque está vacío');
            }
            // Siempre que hayan grupos asociados con cada cliente
            if (
              await this.radUserGroupRepository.find({
                where: { username: o.username },
              })
            ) {
              // Encontrar en la lista de servicios el correspondiente al radiusId == userinfo.id
              const userService = await this.servicesRepository.findOne({
                where: { radiusId: o.id },
                relations: ['sys', 'plan'],
              });
              console.log("\nLinea 246 userService:  ", userService)
              let found = false;
              sysOnNode.forEach(async (u) => {
                console.log(u['id_servicio']);
                if (u['id_servicio'] == userService.clientId) {
                  //Ubícalo en la lista de clientes del nodo
                  const compServ = u;
                  found = true;
                  //encuentra el/los grupo/s:
                  console.log(compServ['estado']);
                  if (compServ['estado'] == 'Suspendido') {
                    if (
                      await this.radUserGroupRepository.findOne({
                        where: { username: o.username, priority: 0 },
                      })
                    ) {
                    } else {
                      await this.UpdateService(userService.id, {
                        sys: userService.sys,
                        status: 2,
                        clientId: userService.clientId,
                        plan: userService.plan,
                        radiusId: userService.radiusId,
                      });
                      this.coaServices.SuspendUser(o.username);
                    }
                  } else if (compServ['estado'] == 'Cancelado') {
                    if (
                      await this.radUserGroupRepository.findOne({
                        where: { username: o.username, groupname: 'cancelado' },
                      })
                    ) {
                    } else {
                      await this.UpdateService(userService.id, {
                        sys: userService.sys,
                        status: 3,
                        clientId: userService.clientId,
                        plan: userService.plan,
                        radiusId: userService.radiusId,
                      });
                      this.coaServices.ChangePlan({
                        username: o.username,
                        newgroupname: 'cancelado',
                      });
                    }
                  } else {
                    //revisar si no estaba suspendido o cancelado en la tabla de servicios
                    if (userService.status != 1 && userService.status != 4) {
                      await this.UpdateService(userService.id, {
                        sys: userService.sys,
                        status: 1,
                        clientId: userService.clientId,
                        plan: userService.plan,
                        radiusId: userService.radiusId,
                      });
                      this.coaServices.ActivateUser(o.username);
                    }
                    //encontrar listname del plan del servicio
                    const plan = await this.plansRepository.findOne({
                      where: { name: compServ['plan_internet']['nombre'] },
                    });
                    if (plan) {
                      console.log(plan.id);
                      console.log(userService['plan']['id']);
                      console.log("\nuserService:  ", userService)
                      if (userService['plan']['id'] != plan.id) {
                        await this.UpdateService(userService.id, {
                          sys: userService.sys,
                          clientId: userService.id,
                          radiusId: userService.radiusId,
                          status: userService.status,
                          plan: {
                            id: plan.id,
                            name: plan.name,
                            listName: plan.listName,
                          },
                        });
                        console.log(`Hizo la actualización`);
                        this.coaServices.ChangePlan({
                          username: o.username,
                          newgroupname: plan.listName,
                        });
                      }
                    } else {
                      console.log(
                        `Plan ${compServ['plan_internet']['nombre']} no encontrado en la tabla de planes`,
                      );
                    }
                  }
                }
              });
              if (!found) {
                console.log(
                  `ID ${userService.clientId} no encontrado en la lista de ${i.name}`,
                );
              }
            } else {
              console.log(
                `No hay grupos asociados a username == ${o.username}`,
              );
            }
          });
        });
        console.log(`Nodo ${node} sincronizado`);
        console.log(`------------------------------------------------\n`);
        return `Nodo ${node} sincronizado`;
      } else {
        console.log(`Tabla userinfo sin address == ${node}`)
        console.log(`------------------------------------------------\n`);
        return `Tabla userinfo sin address == ${node}`;
      }
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
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
  async UpdateService(id: number, updateServDto: UpdateServiceDto) {
    console.log("Linea 372",updateServDto)
    const { sys, clientId, radiusId, status, plan } = updateServDto;

    //* Verificacion de valores para modificar *//
    if (!sys && !clientId && !radiusId && status && !plan) {
      const str = `Los campos para acutalizar el servicio están vacios.\n Se intentó actualizar el servicio con id: ${id}.`;
      console.log(`${str}\n------------------------------------------------\n`);
    }

    //* Se incia la modificación *//
    try {
      console.log(`Realizando update del service ${id}`);
      const serviceToUpdate = await this.servicesRepository.findOneBy({ id });

      serviceToUpdate.radiusId = radiusId;
      serviceToUpdate.clientId = clientId;
      serviceToUpdate.status = status;
      serviceToUpdate.plan = plan;
      serviceToUpdate.sys = sys;

      //* Verificación de update *//
      if (!serviceToUpdate) {
        const str = `No se pudo realizar update al servicio con el id: ${id}.`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
      }

      console.log(`Servicio actualizado exitosamente.
      \n------------------------------------------------\n`);
      return serviceToUpdate;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Elimina una entrada en service mendiante el id.
   * @param id
   */
  async RemoveService(id: number) {
    try {
      console.log(`Eliminando entrada en service con el id. ${id}`);

      const del = await this.servicesRepository.delete(id);

      if (!del) {
        const str = `Hubo un problema al eliminar la entrada`;
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
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
