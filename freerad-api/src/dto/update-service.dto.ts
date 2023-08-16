import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';
import { IsNumber, IsOptional } from 'class-validator';
import { System } from 'src/database/system.entity';
import { RadGroupReply } from 'src/database/radgroupreply.entity';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @IsOptional()
  sys: System[];

  @IsOptional()
  @IsNumber()
  clientId: number;

  @IsOptional()
  radGroup: RadGroupReply;

  @IsOptional()
  @IsNumber()
  radiusId: number;

  @IsOptional()
  @IsNumber()
  status: number;
}