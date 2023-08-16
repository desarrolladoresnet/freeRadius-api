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
    private sysServices: SystemsService,
    private coaServices: CoaService,
  ) {}

  //private readonly services: Service[] = [];

  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Crea una nueva entrada en la tabla, el id de Radius es opcional dado que es probable que exista en Wisphub pero no en Radius en un primer momento.
   * @param service { Service }
   * @returns { object }
   */

  async CreateService(service: Service) {
    const { sys, clientId, radiusId, radGroup, status } = service;

    try {
      //* Creando tabla *//
      const date = new Date();
      console.log(
        `Creado nueva entrada en la tabla 'service' con los valores: sys: ${sys}, clientId: ${clientId}, radiusId: ${radiusId} y plan: ${radGroup}.\nFecha: ${date}\n`,
      );
      const serviceNew = this.servicesRepository.create({
        sys, clientId, radiusId, radGroup, status
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
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Trae toda las entradas en la tabla services.
   * @returns { Array }
   */
  async FindAllServices() {
    try {
      const date = new Date();
      console.log(`Buscando entradas en 'services.\nFecha: ${date}\n`)
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
  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Encuentra una entrada en services mediante el id
   * @param id { number }
   * @returns { object }
   */
  async FindOnService(id: number) {
    //console.log((await this.servicesRepository.findOne({where:{ id }, relations:['sys','plan']})).plan['id'])
    try {
      const date = new Date();
      console.log(`Buscando entradas en 'services' con el id: ${id}.\nFecha: ${date}\n`)
      const services = this.servicesRepository.findOne({where:{ id }, relations:['sys','radGroup']});

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
  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Buca el cliente  por id y se trae informacion del cliente en Wisphub.
   * @param id
   * @returns
   */
  async FindOneOnSys(id: number): Promise<any | null> {
    try {
      const date = new Date();
      console.log(`Buscando información en service de la entrada ${id}.\nFecha: ${date}\n`);
      const serv = await this.servicesRepository.findOne({
        where: { id },
        relations: ['sys', 'radGroup'],
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
        throw new HttpException('No se encontró', HttpStatus.NOT_FOUND);
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
  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Revisa la tabla de nodos para ver en que sistema se encuentra un nodo.
   * @param node
   * @returns
   */
  async SyncService(node: string) {
    const date = new Date();
    console.log(`Buscando nodo ${node}}.\nFecha: ${date}\n`);
    try {
      const nodeSys = await this.nodesRepository.findOne({where:{name:node}, relations:['systems']})
      const sys = nodeSys['systems']
      const userinfoNodes = await this.userinfoRepository.find({where:{address:node}})
      //Si existen clientes en la tabla userinfo
      if (userinfoNodes.length > 0){
        // Por cada sistema que aloje el nodo ${node}
        sys.forEach(async i => {
          const sysOnNode = await this.sysServices.SysNode(i.id,node)
          const userinfoList = await this.userinfoRepository.find({where:{address:node,firstname:i.name}})
          if (userinfoList.length > 0){
          // Para cada uno de los clientes de userinfo
          userinfoList.forEach(async o => {
            if (await this.radUserGroupRepository.find({where:{username:o.username,priority:0}})){
            }
            // Siempre que hayan grupos asociados con cada cliente
            if (await this.radUserGroupRepository.find({where:{username:o.username}})){
            let found = false
            sysOnNode.forEach(async u =>{
              if (u['id_servicio'] == o.lastname){
                //Ubícalo en la lista de clientes del nodo
                const compServ = u
                found = true
                //encuentra el/los grupo/s:
                if (compServ['estado']=='Suspendido'){
                  if (await this.radUserGroupRepository.findOne({where:{username:o.username,priority:0}})){
                } else{
                  this.coaServices.SuspendUser(o.username)
                }
                } else if(compServ['estado']=='Cancelado'){
                  if (await this.radUserGroupRepository.findOne({where:{username:o.username,groupname:'cancelado'}})){}
                  else{
                    this.coaServices.ChangePlan({username:o.username,newgroupname:'cancelado'})
                  }
                  }
                else {
                  //revisar si no estaba suspendido o cancelado en la tabla de servicios
                  if (await this.radUserGroupRepository.find({where:{username:o.username,priority:0}}) || await this.radUserGroupRepository.find({where:{username:o.username,groupname:'cancelado'}}) ){
                    this.coaServices.ActivateUser(o.username)
                  }
                  //Ya no se busca la lista de planes, se compara directamente el plan de wisphub con el groupname
                  if (await this.radUserGroupRepository.findOne({where:{username:o.username,priority:10}})){
                    const currentPlan = await this.radUserGroupRepository.findOne({where:{username:o.username,priority:10}})
                    if (currentPlan != compServ['plan_internet']['nombre']){
                      //const updateplan =
                      this.coaServices.ChangePlan({username:o.username,newgroupname:compServ['plan_internet']['nombre']})
                    }
                  } else {console.log(`${o.username} sin groupname con priority == 10`)}
                }
              }
            })
            if (!found){
              console.log(`ID ${o.lastname} no encontrado en la lista de ${i.name}`)
            }
          } else {console.log(`No hay grupos asociados a username == ${o.username}`)}
          })
      } else {return `No hay clientes en la empresa ${i.name} dentro del nodo ${node}`}})
        return `Nodo ${node} sincronizado`;
      } else {return `Tabla userinfo sin address == ${node}`}
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Realiza update de una entrada mediante el id.
   * Si no hay valores para realizar el update se rechaza la peticion.
   * @param id
   * @param updateServDto
   * @returns
   */
  async UpdateService(id: number, updateServDto: UpdateServiceDto) {
    const date = new Date();
    console.log(`Actualizando el servicio con el id: ${id}.\nFecha: ${date}\n`);
    const { radiusId,clientId,status,radGroup,sys } = updateServDto

    //* Verificacion de valores para modificar *//
    if (!radiusId || !clientId || !status || !radGroup || !sys) {
      const str = `Los campos para acutalizar el servicio están vacios.\n Se intentó actualizar el servicio con id: ${id}.`;
      console.log(`${str}\n------------------------------------------------\n`);
    }

    //* Se incia la modificación *//
    try {
      console.log(`Realizando update del service ${id}`);
      const serviceToUpdate = await this.servicesRepository.findOneBy({ id })

      serviceToUpdate.radiusId = radiusId
      serviceToUpdate.clientId = clientId
      serviceToUpdate.status = status
      serviceToUpdate.radGroup = radGroup
      serviceToUpdate.sys = sys

      const serviceUpdated = await this.servicesRepository.save(serviceToUpdate)
      //* Verificación de update *//
      if (!serviceUpdated) {
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
  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Elimina una entrada en service mendiante el id.
   * @param id
   */
  async RemoveService(id: number) {
    try {
      const date = new Date();
      console.log(`Eliminando entrada en service con el id: ${id}.\nFecha: ${date}\n`);
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
