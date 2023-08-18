import { IsNotEmpty, IsString } from 'class-validator';
import { System } from './system.entity';
import { PartialType } from '@nestjs/mapped-types';
import { CreateNodeDto } from './create-node.dto';

export class UpdateNodeDto extends PartialType(CreateNodeDto) {
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  systems: System[];
}
