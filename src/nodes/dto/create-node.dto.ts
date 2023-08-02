import { IsIP, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { System } from "src/systems/entities/system.entity";

export class CreateNodeDto {
    
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    systems: System[];

}
