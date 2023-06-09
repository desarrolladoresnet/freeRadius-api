/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsString,
  IsOptional,
	IsInt,
} from 'class-validator';

export class UpdateRadCheckDto {

	@IsInt()
	@IsNotEmpty()
	id: number;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  attribute: string;

  @IsOptional()
  @IsString()
  op: string;

  @IsOptional()
  @IsString()
  value: string;
}
