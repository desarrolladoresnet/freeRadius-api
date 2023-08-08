import { IsIP, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { System } from 'src/database/system.entity';
import { Plan } from 'src/database/plan.entity';

export class CreateServiceDto {
  id: number;

  @IsNotEmpty()
  sys: System[];

  @IsNumber()
  @IsNotEmpty()
  clientId: number;

  @IsNotEmpty()
  plan: Plan[];

  @IsNumber()
  radiusId: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(4)
  status: number;
}
