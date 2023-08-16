import {
  IsIP,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { System } from 'src/database/system.entity';
import { RadGroupReply } from 'src/database/radgroupreply.entity';

export class CreateServiceDto {
  id: number;

  @IsNotEmpty()
  sys: System[];

  @IsNumber()
  @IsNotEmpty()
  clientId: number;

  @IsNotEmpty()
  radGroup: RadGroupReply;

  @IsOptional()
  @IsNumber()
  radiusId: number;

  @IsNumber()
  @IsNotEmpty()
  status: number;
}
