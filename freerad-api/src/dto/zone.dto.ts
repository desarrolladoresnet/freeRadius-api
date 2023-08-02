/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
  @IsNumber()
  Nas: number;

	@IsNotEmpty()
  @IsString()
  coord: string;
}

export class ZoneUpadateDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  tlf: string;

  @IsOptional()
  @IsString()
  codigo_zona: string;

  @IsOptional()
  @IsNumber()
  Nas: number;

  @IsOptional()
  @IsString()
  coord: string;
}