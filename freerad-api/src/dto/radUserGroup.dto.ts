/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RadUserGroupDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  groupname: string;
  
  @IsOptional()
  @IsNumber()
  priority: number;

}


export class RadUserGroupUpdateDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  groupname: string;

  @IsOptional()
  @IsNumber()
  priority: number;
}