/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsInt,
} from 'class-validator';

export class UpdateUserInfoDto {
  @IsNotEmpty()
  @IsString()
  updateby: string;

  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
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
}
