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
    @InjectRepository(System)
    private systemsRepository: Repository<System>,
    @InjectRepository(Plan)
    private plansRepository: Repository<Plan>,
    private sysServices: SystemsService,
    private coaServices: CoaService,
  ) {}

  private readonly services: Service[] = [];

  async create(service: Service) {
    const { sys, clientId, radiusId, plan, status }  = service
    const serviceNew = this.servicesRepository.create({
      sys, clientId, radiusId, plan, status
    })
    return await this.servicesRepository.save(serviceNew)

      }

  findAll(): Promise<Service[]> {
    return this.servicesRepository.find({relations:['sys','plan']});
  }

  async findOne(id: number): Promise<Service | null> {
    //console.log((await this.servicesRepository.findOne({where:{ id }, relations:['sys','plan']})).plan['id'])
    return await this.servicesRepository.findOne({where:{ id }, relations:['sys','plan']});
  }

  async findOneOnSys(id: number):  Promise<any| null> {
    try {
    const serv = await this.servicesRepository.findOne({where:{ id }, relations:['sys','plan']});
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
        // Para cada uno de los clientes de userinfo
        userinfoNodes.forEach(async o => {
          if (await this.radUserGroupRepository.find({where:{username:o.username,priority:0}})){
          }
          // Siempre que hayan grupos asociados con cada cliente
          if (await this.radUserGroupRepository.find({where:{username:o.username}})){
            // Encontrar en la lista de servicios el correspondiente al radiusId == userinfo.id
            if (await this.servicesRepository.findOne({where:{radiusId:o.id},relations:['sys','plan']})) {
          const userService = await this.servicesRepository.findOne({where:{radiusId:o.id},relations:['sys','plan']})
          var found = false
          sysOnNode.forEach(async u =>{
            if (u['id_servicio'] == userService.clientId){
              //Ubícalo en la lista de clientes del nodo
              const compServ = u
              found = true
              //encuentra el/los grupo/s:
              if (compServ['estado']=='Suspendido'){
                if (await this.radUserGroupRepository.findOne({where:{username:o.username,priority:0}})){
              } else{
                await this.update(userService.id,{sys:userService.sys,status:2,clientId:userService.clientId,plan:userService.plan,radiusId:userService.radiusId})
                this.coaServices.SuspendUser(o.username)
              }
              } else if(compServ['estado']=='Cancelado'){
                if (await this.radUserGroupRepository.findOne({where:{username:o.username,groupname:'cancelado'}})){}
                 else{
                  await this.update(userService.id,{sys:userService.sys,status:3,clientId:userService.clientId,plan:userService.plan,radiusId:userService.radiusId})
                  this.coaServices.ChangePlan({username:o.username,newgroupname:'cancelado'})
                }
                }
              else {
                //revisar si no estaba suspendido o cancelado en la tabla de servicios
                if (userService.status != 1 && userService.status != 4 ){
                  await this.update(userService.id,{sys:userService.sys,status:1,clientId:userService.clientId,plan:userService.plan,radiusId:userService.radiusId})
                  this.coaServices.ActivateUser(o.username)
                }
                //encontrar listname del plan del servicio
                const plan = await this.plansRepository.findOne({where:{name:compServ['plan_internet']['nombre']}})
                if (plan){
                if (userService['plan']['id'] != plan.id){
                  await this.update(userService.id,{sys:userService.sys,clientId:userService.id,radiusId:userService.radiusId,status:userService.status,plan:{id:plan.id,name:plan.name,listName:plan.listName}})
                  this.coaServices.ChangePlan({username:o.username,newgroupname:plan.listName})
                }} else {console.log(`Plan ${compServ['plan_internet']['nombre']} no encontrado en la tabla de planes`)}
              }
            }
          })
          if (!found){
            console.log(`ID ${userService.clientId} no encontrado en la lista de ${i.name}`)
          }
        } else {console.log(`No encontrado servicio con radiusId == ${o.id}`)}} else {console.log(`No hay grupos asociados a username == ${o.username}`)}
        })
      })
      return `Nodo ${node} sincronizado`;
    } else {return `Tabla userinfo sin address == ${node}`}
  }

  async update(id: number, updateServDto: UpdateServiceDto) {
    const { radiusId,clientId,status,plan,sys } = updateServDto
    const serviceToUpdate = await this.servicesRepository.findOneBy({id})
    serviceToUpdate.radiusId = radiusId
    serviceToUpdate.clientId = clientId
    serviceToUpdate.status = status
    serviceToUpdate.plan = plan
    serviceToUpdate.sys = sys
    this.servicesRepository.save(serviceToUpdate)
    return this.servicesRepository.save(serviceToUpdate,{reload:true});
  }
  async remove(id: number): Promise<void> {
    await this.servicesRepository.delete(id);
  }
}
