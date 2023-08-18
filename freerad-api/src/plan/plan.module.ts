/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { Plan } from '../database/entities/plan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * Modulo para crear y manipular los planes de servicio de Netcom.
 * Hubo que crear la tabla manualmente. 
 * El comando MySql se encuentra comentado en En la entidad del plan.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Plan])],
  controllers: [PlanController],
  providers: [PlanService],
  exports: [PlanService]
})
export class PlanModule {}
