/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from '../dto/plan.dto';
import { UpdatePlanDto } from '../dto/plan.dto';
// import { UpdatePlanDto } from './dto/update-plan.dto';
//import { UpdatePlanDto } from 'src/dto/update-plan.dto';

/**
 * Ruta principal para manipular los planes.
 */
@Controller('plan')
export class PlanController {
  constructor(private planService: PlanService) {}

  /**
   * Recibe dos parametros en forma de String, name: Que sería el nomabre comercial y listname: El nombre en lista.
   * @param data { createPlanDto } 
   * @returns { object }
   */
  @Post()
  async createPlan(@Body() data: CreatePlanDto) {
    return await this.planService.CreatePlan(data);
  }

  /**
   * Trae todo los planes
   * @returns { Array }
   */
  @Get()
  findAllPlans() {
    return this.planService.FindAllPlans();
  }

  /**
   * Trae una entrada en base al id del plan buscado.
   * @param id { number }
   * @returns { object }
   */
  @Get(':id')
  findOnePlan(@Param('id') id: number) {
    return this.planService.FindOnePlan(id);
  }

  /**
   * Permite actualizar una entrada en base al id y los parametros enviados.
   * @param id { number }
   * @param data { UpdatePlanDto } 
   */
  @Put(':id')
  updatePlan(@Param('id') id: number, @Body() data: UpdatePlanDto) {
    return this.planService.UpdatePlan(id, data);
  }

  /**
   * Permite eliminar una entrada en base al id.
   * @param id { number }
   * @returns { object }
   */
  @Delete(':id')
  removePlan(@Param('id') id: number) {
    return this.planService.RemovePlan(id);
  }
}
