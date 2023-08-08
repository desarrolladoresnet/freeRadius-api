/* eslint-disable prettier/prettier */
import { IsIP, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * 
 */
export class NasDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsIP()
  ip_address: string;

  @IsNotEmpty()
  @IsString()
  secret: string;

  /***********************************************************************
   *                                                                     *
   * CAMPOS OPCIONALES                                                   *
   * Se dejan estos campos para un posible uso futuro                    *
   *                                                                     *
   ***********************************************************************/

  @IsOptional()
  @IsNumber()
  ports: number;

  @IsOptional()
  @IsString()
  server: string;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  community: string;

  @IsOptional()
  @IsString()
  description: string;
}


export class NasDtoUpdate {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsIP()
  ip_address: string;

  @IsOptional()
  @IsString()
  secret: string;

  @IsOptional()
  @IsNumber()
  ports: number;

  @IsOptional()
  @IsString()
  server: string;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  community: string;

  @IsOptional()
  @IsString()
  description: string;
}