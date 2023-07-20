/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class ZoneDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  tlf: string;

  @IsNotEmpty()
  @IsString()
  codigo_zona: string;

	@IsNotEmpty()
  @IsString()
  Nas: string;

	@IsNotEmpty()
  @IsString()
  coord: string;
}