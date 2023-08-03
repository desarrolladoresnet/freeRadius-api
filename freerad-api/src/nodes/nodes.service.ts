/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateNodeDto } from '../database/create-node.dto';
// import { UpdateNodeDto } from './dto/update-node.dto';
import { UpdateNodeDto } from 'src/database/update-node.dto';
import { ZonaCliente } from '../database/node.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NodesService {
  constructor(
    @InjectRepository(ZonaCliente)
    private readonly nodeRepository: Repository<ZonaCliente>,
  ) {}

  async create(node: ZonaCliente) {
    const { name, systems } = node;
    const nodeNew = await this.nodeRepository.create({
      name,
      systems,
    });
    return await this.nodeRepository.save(nodeNew);
  }

  findAll(): Promise<ZonaCliente[]> {
    return this.nodeRepository.find({ relations: ['systems'] });
  }

  async findOne(id: number) {
    return this.nodeRepository.findOne({
      where: { id: id },
      relations: ['systems'],
    });
  }

  async update(id: number, updateNodeDto: UpdateNodeDto) {
    const { name, systems } = updateNodeDto;
    const zoneToUpdate = await this.nodeRepository.findOneBy({ id });
    zoneToUpdate.name = name;
    zoneToUpdate.systems = systems;
    this.nodeRepository.save(zoneToUpdate);
    return this.nodeRepository.save(zoneToUpdate);
  }

  async remove(id: number): Promise<void> {
    await this.nodeRepository.delete(id);
  }
}
