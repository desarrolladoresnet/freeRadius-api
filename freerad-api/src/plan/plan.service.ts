import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from '../dto/create-plan.dto';
import { UpdatePlanDto } from 'src/dto/update-plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from '../database/plan.entity';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
  ) {}
  private readonly plans: Plan[] = [];

  async create(plan: Plan) {
    const { name, listName } = plan
    const planNew = await this.planRepository.create({
      name, listName
    })
    //this.plans.push(plan);
    return await this.planRepository.save(planNew)
  }

  findAll(): Promise<Plan[]> {
    return this.planRepository.find();
  }

  findOne(id: number): Promise<Plan | null> {
    return this.planRepository.findOneBy({ id });
  }

  update(id: number, updatePlanDto: UpdatePlanDto) {
    this.planRepository.update(id,updatePlanDto)
    return `This action updates a #${id} service`;
  }

  async remove(id: number): Promise<void> {
    await this.planRepository.delete(id);
  }
}
