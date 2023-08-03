import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlanDto {
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  listName: string;
}
