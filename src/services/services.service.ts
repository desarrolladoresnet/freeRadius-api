import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { UserInfo } from 'src/userinfo/entities/userinfo.entity';
import { RadUserGroup } from 'src/radusergroup/entities/radusergroup.entity';
import { Node } from 'src/nodes/entities/node.entity';
import { System } from 'src/systems/entities/system.entity';
import { SystemsService } from 'src/systems/systems.service'
import { CoaService } from 'src/coa/coa.service';
import { Plan } from 'src/plan/entities/plan.entity';
import { error } from 'console';
import { RadGroupReply } from 'src/radgroupreply/entities/radgroupreply.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
    @InjectRepository(UserInfo)
    private userinfoRepository: Repository<UserInfo>,
    @InjectRepository(RadUserGroup)
    private radUserGroupRepository: Repository<RadUserGroup>,
    @InjectRepository(Node)
    private nodesRepository: Repository<Node>,
    private sysServices: SystemsService,
    private coaServices: CoaService,
  ) {}

  private readonly services: Service[] = [];

  async create(service: Service) {
    const { sys, clientId, radiusId, radGroup, status }  = service
    const serviceNew = this.servicesRepository.create({
      sys, clientId, radiusId, radGroup, status
    })
    return await this.servicesRepository.save(serviceNew)

      }

  findAll(): Promise<Service[]> {
    return this.servicesRepository.find({relations:['sys','plan']});
  }

  async findOne(id: number): Promise<Service | null> {
    //console.log((await this.servicesRepository.findOne({where:{ id }, relations:['sys','plan']})).plan['id'])
    return await this.servicesRepository.findOne({where:{ id }, relations:['sys','radGroup']});
  }

  async findOneOnSys(id: number):  Promise<any| null> {
    try {
    const serv = await this.servicesRepository.findOne({where:{ id }, relations:['sys','radGroup']});
    const sys = (serv).sys
    const ep = sys['endPoint']
    const superagent = require('superagent');
    return await superagent.get(`${ep}${serv.clientId}`)
    .set('authorization', `Api-Key ${sys['apiKey']}`)
    .set('content-type','application/json').then((res)=> res.body)
  } catch(err){
    console.log(err)
    throw new HttpException('No se encontró', HttpStatus.NOT_FOUND)
  }
  }

  async sync(node: string){
    const nodeSys = await this.nodesRepository.findOne({where:{name:node}, relations:['systems']})
    const sys = nodeSys['systems']
    const userinfoNodes = await this.userinfoRepository.find({where:{address:node}})
    //Si existen clientes en la tabla userinfo
    if (userinfoNodes.length > 0){
      // Por cada sistema que aloje el nodo ${node}
      sys.forEach(async i => {
        const sysOnNode = await this.sysServices.sysNode(i.id,node)
        const userinfoList = await this.userinfoRepository.find({where:{address:node,firstname:i.name}})
        if (userinfoList.length > 0){
        // Para cada uno de los clientes de userinfo
        userinfoList.forEach(async o => {
          if (await this.radUserGroupRepository.find({where:{username:o.username,priority:0}})){
          }
          // Siempre que hayan grupos asociados con cada cliente
          if (await this.radUserGroupRepository.find({where:{username:o.username}})){
          var found = false
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
  }

  async update(id: number, updateServDto: UpdateServiceDto) {
    const { radiusId,clientId,status,radGroup,sys } = updateServDto
    const serviceToUpdate = await this.servicesRepository.findOneBy({id})
    serviceToUpdate.radiusId = radiusId
    serviceToUpdate.clientId = clientId
    serviceToUpdate.status = status
    serviceToUpdate.radGroup = radGroup
    serviceToUpdate.sys = sys
    this.servicesRepository.save(serviceToUpdate)
    return this.servicesRepository.save(serviceToUpdate,{reload:true});
  }
  async remove(id: number): Promise<void> {
    await this.servicesRepository.delete(id);
  }
}
