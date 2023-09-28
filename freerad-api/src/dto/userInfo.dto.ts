/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

enum Empresas {
  NPCA = "NPCA",
  INYC = "INYC"
}

export class UserInfoDto {
  /**
   * Serial de la Onu.
   */
  @IsNotEmpty()
  @IsString()
  username: string;

  /**
   * Nombre de la empresa asociada (Netcom o NC)
   */
  @IsNotEmpty()
  @IsString()
  @IsEnum(Empresas)
  firstname: Empresas;

  /**
   * ID de Wisphub.
   */
  @IsNotEmpty()
  @IsString()
  lastname: string;

  /**
   * Usuario que crea el registro
   */
  @IsNotEmpty()
  @IsString()
  creationby: string;

  /**
   * Nodo/zona
   */
  @IsNotEmpty()
  @IsString()
  address: string;


  /***********************************************************************
   *                                                                     *
   * CAMPOS OPCIONALES                                                   *
   * Se dejan estos campos para un posible uso futuro                    *
   *                                                                     *
   ***********************************************************************/
  @IsOptional()
  @IsString()
  email: string;

    /**
   * Usuario que realiza el ultimo update
   */
    @IsOptional()
    @IsString()
    updateby: string;
  

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

  // RADCHECK
  @IsNotEmpty()
  @IsString()
  password: string;

  // RADUSERGROUP
    /**
   * Plan asignado al cliente
   */
    @IsNotEmpty()
    @IsString()
    groupname: string;

    /**
     * Prioridad del cliente
     */
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(10)
    priority: number;


  @IsOptional()
  name: string;


}
