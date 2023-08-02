import { Injectable } from '@nestjs/common';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateNodeDto } from './dto/update-node.dto';
import { Node } from './entities/node.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NodesService {
  constructor(
    @InjectRepository(Node)
    private readonly nodeRepository: Repository<Node>,
  ) {}

  async create(node: Node) {
    const { name, systems }  = node
    const nodeNew = await this.nodeRepository.create({
      name, systems
    })
    return await this.nodeRepository.save(nodeNew)
  }

  findAll(): Promise<Node[]> {
    return this.nodeRepository.find({relations:['systems']});
  }

  findOne(id: number): Promise<Node | null> {
    return this.nodeRepository.findOne({where:{id:id}, relations: ['systems']});
  }

  async update(id: number, updateNodeDto: UpdateNodeDto) {
    const { name,systems } = updateNodeDto
    const zoneToUpdate = await this.nodeRepository.findOneBy({id})
    zoneToUpdate.name = name
    zoneToUpdate.systems = systems
    this.nodeRepository.save(zoneToUpdate)
    return this.nodeRepository.save(zoneToUpdate);
  }

  async remove(id: number): Promise<void> {
    await this.nodeRepository.delete(id);
  }
}
