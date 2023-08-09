import { IsIP, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';
import { System } from 'src/systems/entities/system.entity'
import { Plan } from 'src/plan/entities/plan.entity';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
    @IsOptional()
    sys: System[];

    @IsOptional()
    @IsNumber()
    clientId: number;

    @IsOptional()
    plan: Plan;

    @IsOptional()
    @IsNumber()
    radiusId: number;

    @IsOptional()
    @IsNumber()
    status: number;
}
