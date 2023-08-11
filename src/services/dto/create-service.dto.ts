import { IsIP, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { System } from "src/systems/entities/system.entity";
import { Plan } from "src/plan/entities/plan.entity";

export class CreateServiceDto {
    id: number;

    @IsNotEmpty()
    sys: System[];

    @IsNumber()
    @IsNotEmpty()
    clientId: number;

    @IsNotEmpty()
    plan: Plan;

    @IsOptional()
    @IsNumber()
    radiusId: number;

    @IsNumber()
    @IsNotEmpty()
    status: number;
}