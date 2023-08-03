/* eslint-disable prettier/prettier */
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
// import { CreateServiceDto } from '../dto/create-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../database/service.entity';
import { Node } from 'src/database/node.entity';
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

  /////////////////////////////////////////////////////////////////////////////////////////

  async create(service: Service) {
    const { sys, clientId, radiusId, plan } = service;
    const serviceNew = this.servicesRepository.create({
      sys,
      clientId,
      radiusId,
      plan,
    });
    return await this.servicesRepository.save(serviceNew);
  }

  findAll(): Promise<Service[]> {
    return this.servicesRepository.find({ relations: ['sys', 'plan'] });
  }

  /////////////////////////////////////////////////////////////////////////////////////////

  async findOne(id: number): Promise<Service | null> {
    //console.log((await this.servicesRepository.findOne({where:{ id }, relations:['sys','plan']})).plan['id'])
    return await this.servicesRepository.findOne({
      where: { id },
      relations: ['sys', 'plan'],
    });
  }

  /////////////////////////////////////////////////////////////////////////////////////////

  async findOneOnSys(id: number): Promise<any | null> {
    try {
      const serv = await this.servicesRepository.findOne({
        where: { id },
        relations: ['sys', 'plan'],
      });
      const sys = serv.sys;
      const ep = sys['endPoint'];
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const superagent = require('superagent');
      return await superagent
        .get(`${ep}${serv.clientId}`)
        .set('authorization', `Api-Key ${sys['apiKey']}`)
        .set('content-type', 'application/json')
        .then((res) => res.body);
    } catch (err) {
      console.log(err);
      throw new HttpException('No se encontró', HttpStatus.NOT_FOUND);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////

  async sync(node: string) {
    const nodeSys = await this.nodesRepository.findOne({
      where: { name: node },
      relations: ['systems'],
    });
    const sys = nodeSys['systems'];
    sys.forEach(async (i) => {
      //Para cada sistema del nodo encuentra la lista de clientes en ese nodo
      const sysOnNode = await this.sysServices.sysNode(i.id, node);
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

  update(id: number, updateServDto: UpdateServiceDto) {
    this.servicesRepository.update(id, updateServDto);
    return `This action updates a #${id} service`;
  }

  /////////////////////////////////////////////////////////////////////////////////////////


  async remove(id: number): Promise<void> {
    await this.servicesRepository.delete(id);
  }
}
