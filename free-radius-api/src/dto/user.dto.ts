/* eslint-disable prettier/prettier */

import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class UserDto {
  //Quien crea la tabla
  @IsNotEmpty()
  @IsString()
  creationby: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  mobilephone: string;

  
  // No obligatorios


  @IsString()
  @IsOptional()
  department: string;

  @IsString()
  @IsOptional()
  company: string;

  @IsString()
  @IsOptional()
  workphone: string;

  @IsString()
  @IsOptional()
  homephone: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  city: string;

@IsOptional()
  @IsString()
  state: string;

@IsOptional()
  @IsString()
  country: string;

@IsOptional()
  @IsNumber()
  zip: string;

@IsOptional()
  @IsString()
  notes: string;

@IsOptional()
  @IsString()
  changeuserinfo: string;

@IsOptional()
  @IsString()
  portalloginpassword: string;

@IsOptional()
  @IsNumber()
  enableportallogin: number;

  //* RADCHECK *//

  @IsNotEmpty()
  @IsString()
  attribute: string;

  @IsNotEmpty()
  @IsString()
  op: string;

  @IsNotEmpty()
  @IsString()
  value: string;

  //* RADUSERGROUP *//

  @IsNotEmpty()
  @IsString()
  groupname: string;

  @IsNotEmpty()
  @IsNumber()
  priority: number;
}