/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class NasDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
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
