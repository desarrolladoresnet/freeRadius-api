import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Injectable,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from '../dto/create-plan.dto';
// import { UpdatePlanDto } from './dto/update-plan.dto';
import { UpdatePlanDto } from 'src/dto/update-plan.dto';

@Controller('plan')
export class PlanController {
  constructor(private planService: PlanService) {}

  @Post()
  async create(@Body() createPlanDto: CreatePlanDto) {
    return await this.planService.create(createPlanDto);
  }

  @Get()
  findAll() {
    return this.planService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
    this.planService.update(+id, updatePlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planService.remove(+id);
  }
}
