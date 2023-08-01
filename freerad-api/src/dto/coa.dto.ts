/* eslint-disable prettier/prettier */
import { IsIP, IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * Dto creado para el metodo de modificacion en el coa.service.
 */
export class CoaDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsIP()
  attribute: string;

  @IsNotEmpty()
  @IsString()
  value: string;

  /***********************************************************************
   *                                                                     *
   * CAMPOS OPCIONALES                                                   *
   * Se dejan estos campos para un posible uso futuro                    *
   *                                                                     *
   ***********************************************************************/

  @IsOptional()
  @IsString()
  secret: string;

  @IsOptional()
  @IsString()
  server: string;

  @IsOptional()
  @IsString()
  nasipaddress: string;
}

/**
 * Dto creado para el metodo de cambio de plan en el coa.service
 */
export class ChangePlanDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  newgroupname: string;
}