import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { System } from './entities/system.entity';

@Injectable()
export class SystemsService {
  constructor(
    @InjectRepository(System)
    private sysRepository: Repository<System>,
  ) {}

  private readonly systems: System[] = [];
  
  async create(sys: System) {
    const { name, apiKey, endPoint } = sys
      //this.systems.push(sys);
      const systNew = await this.sysRepository.create({
        name, apiKey, endPoint
      })
      return await this.sysRepository.save(systNew)
  }


  findAll(): Promise<System[]> {
    return this.sysRepository.find();
  }

  async findOne(id: number): Promise<System | null> {
    try {
    return await this.sysRepository.findOneBy({ id })
  } catch (err) {
    throw new HttpException(
      'Not Found',
      HttpStatus.NOT_FOUND)
  }
}
  async allOnSys(id: number): Promise<Array<any>> {
    const sys= await this.sysRepository.findOneBy({ id })
    const superagent = require('superagent');
    const ep = sys.endPoint
    return await superagent.get(`${sys.endPoint}`)
    .set('authorization', `Api-Key ${sys.apiKey}`)
    .set('content-type','application/json').then((res)=> res.body['results'])

  }

  public async sysNode(id:number, node: string) {
    const all = await this.allOnSys(id);
    const nodeList: any [] = [];
    all.forEach(async i =>{
      if (i["router"]['nombre']==node){
        nodeList.push(i)
      }
    })
    return await nodeList
  }

  update(id: number, updateSysDto: UpdateSystemDto) {
    this.sysRepository.update(id,updateSysDto)
    return `Sistema ${id} actualizado`;
  }
  async remove(id: number): Promise<void> {
    await this.sysRepository.delete(id);
  }
}
