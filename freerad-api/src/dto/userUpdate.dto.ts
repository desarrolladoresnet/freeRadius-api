/* eslint-disable prettier/prettier */
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UserUpdateDto {
    /**
   * El cliente en Odoo.
   */
    @IsOptional()
    @IsString()
    name: string;

  /**
   * Serial de la Onu.
   */
  @IsOptional()
  @IsString()
  username: string;

  /**
   * Nombre de la empresa asociada (Netcom o NC)
   */
  @IsOptional()
  @IsString()
  firstname: string;

  /**
   * ID de Wisphub.
   */
  @IsOptional()
  @IsString()
  lastname: string;

  /**
   * Usuario que realiza el ultimo update
   */
  @IsOptional()
  @IsString()
  updateby: string;

  /**
   * Usuario que crea el registro
   */
  @IsOptional()
  @IsString()
  creationby: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  department: string;

  @IsOptional()
  @IsString()
  company: string;

  @IsOptional()
  @IsString()
  workphone: string;

  @IsOptional()
  @IsString()
  homephone: string
  
  @IsOptional()
  @IsString()
  mobilephone: string;

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
