import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RadGroupReply } from './entities/radgroupreply.entity';
import { UpdateRadGroupReplyDto } from './dto/update-radgroupreply.dto';

@Injectable()
export class RadGroupReplyService {
  constructor(
    @InjectRepository(RadGroupReply)
    private radgroupreplyRepository: Repository<RadGroupReply>,
  ) {}
  private readonly plans: RadGroupReply[] = [];

  async create(radgroupreply: RadGroupReply) {
    const { groupname, attribute, value, op } = radgroupreply
    const planNew = await this.radgroupreplyRepository.create({
      groupname, value, attribute, op
    })
    //this.plans.push(plan);
    return await this.radgroupreplyRepository.save(planNew)
  }

  findAll(): Promise<RadGroupReply[]> {
    return this.radgroupreplyRepository.find();
  }

  findOne(id: number): Promise<RadGroupReply | null> {
    return this.radgroupreplyRepository.findOneBy({ id });
  }

  update(id: number, updateRadGroupReplyDto: UpdateRadGroupReplyDto) {
    this.radgroupreplyRepository.update(id,updateRadGroupReplyDto)
    return `This action updates a #${id} RadGroupReply`;
  }

  async remove(id: number): Promise<void> {
    await this.radgroupreplyRepository.delete(id);
  }
}