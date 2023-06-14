/* eslint-disable prettier/prettier */

import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNumber,
  IsOptional,
} from 'class-validator';

/**
 * Interfaz para la creacion de un nuevo usuario en la tablas "userinfo", "radcheck" y "radusergroup".
 * El primer grupo de campo pertenecen a los campo minimos obligatorio para la creacion de un usuario en "userinfo".
 * Es seguido de campo opcionales, no importa que estos no lleguen, la API se encarga de llenar los campos vacios.
 * Siguen los campo de "radcheck", algunos de los campos estan en discusion.
 * Finalmente los campos de "usergroup", igualmente esta tabla.
 */
export class UserDto {
  /**
   * Que usuario del sistema crea la tabla.
   */
  @IsNotEmpty()
  @IsString()
  creationby: string;

  /**
   * Nombre de usuario del cliente.
   */
  @IsNotEmpty()
  @IsString()
  username: string;

  /**
   * Contraseña.
   */
  @IsNotEmpty()
  @IsString()
  password: string;

  /**
   * Primer nombre legal del cliente.
   */
  @IsNotEmpty()
  @IsString()
  firstname: string;

  /**
   * Apellido del cliente.
   */
  @IsNotEmpty()
  @IsString()
  lastname: string;

  /**
   * Correo electrónico, debe estar en el formato correcto o será rechazado.
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Número de celular.
   */
  @IsString()
  @IsNotEmpty()
  mobilephone: string;

  //* No obligatorios *//

  /**
   * Departamento de residencia-
   */
  @IsString()
  @IsOptional()
  department: string;

  /**
   * Compañía si aplica.
   */
  @IsString()
  @IsOptional()
  company: string;

  /**
   * Teléfono de trabajo.
   */
  @IsString()
  @IsOptional()
  workphone: string;

  /**
   * Teléfono de casa.
   */
  @IsString()
  @IsOptional()
  homephone: string;

  /**
   * Dirección de residencia.
   */
  @IsOptional()
  @IsString()
  address: string;

  /**
   * Ciudad de residencia.
   */
  @IsOptional()
  @IsString()
  city: string;

  /**
   * Estado de residencia.
   */
  @IsOptional()
  @IsString()
  state: string;

  /**
   * País, por defecto coloca "Venezuela".
   */
  @IsOptional()
  @IsString()
  country: string;

  /**
   * Código postal.
   */
  @IsOptional()
  @IsNumber()
  zip: string;

  /**
   * Notas sobre el cliente que puedan resultar útiles.
   */
  @IsOptional()
  @IsString()
  notes: string;

  /**
   * Se desconoce el motivo de este campo.
   */
  @IsOptional()
  @IsString()
  changeuserinfo: string;

  /**
   * Se desconoce el motivo de este campo.
   */
  @IsOptional()
  @IsString()
  portalloginpassword: string;

  /**
   * Se desconoce el motivo de este campo.
   */
  @IsOptional()
  @IsNumber()
  enableportallogin: number;

  //* RADCHECK *//

  /**
   * Por definir
   */
  @IsString()
  attribute: string;

  /**
   * Operacion realizada por el router.
   */
  @IsString()
  op: string;

  /**
   * Por definir.
   */
  @IsNotEmpty()
  @IsString()
  value: string;

  //* RADUSERGROUP *//

  /**
   * Servicio al que pertenece el usuario.
   */
  @IsNotEmpty()
  @IsString()
  groupname: string;

  /**
   * Prioridad de uso del usuario.
   */
  @IsNotEmpty()
  @IsNumber()
  priority: number;
}
