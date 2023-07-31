/* eslint-disable prettier/prettier */
import { IsIP, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CoaDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsIP()
  attribute: string;

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
  @IsString()
  value: string;

  @IsOptional()
  @IsString()
  server: string;

  @IsOptional()
  @IsString()
  nasipaddress: string;
}

export class ChangePlanDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  newgroupname: string;
}