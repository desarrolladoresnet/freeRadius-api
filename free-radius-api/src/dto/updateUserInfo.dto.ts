/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsInt,
} from 'class-validator';

/**
 * Interfaz para modificar los valores de una fila en la tabla "userinfo".
 * El campo 'updateby' es obligartoio junto con el campo 'id' más un valo a modificar.
 */
export class UpdateUserInfoDto {
  /**
   * Que usuario del sistema realiza la actualizacion de los datos.
   */
  @IsNotEmpty()
  @IsString()
  updateby: string;

  /**
   * Id en numeros enteros de la fila.
   */
  @IsInt()
  @IsNotEmpty()
  id: number;

  /**
   * Nombre de usuario a quien se le presta un servicio.
   */
  @IsOptional()
  @IsString()
  username: string;

  /**
   * Contraseña.
   */
  @IsOptional()
  @IsString()
  password: string;

  /**
   * Primer nombre legal del usuario.
   */
  @IsOptional()
  @IsString()
  firstname: string;

  /**
   * Segundo nombre legal del usuario.
   */
  @IsOptional()
  @IsString()
  lastname: string;

  /**
   * Correo electrónico, debe estar en un formato válido para no ser rechazado por la interfaz.
   */
  @IsOptional()
  @IsEmail()
  email: string;

  /**
   * Número de celular.
   * No se impolmento el decorado @IsPhone dado que no evalua de forma aceptada el formato de números de tlf de Venezuela.
   * @todo crear un decorador perzonalizado para los nnúmeros telefónicos.
   */
  @IsOptional()
  @IsNotEmpty()
  mobilephone: string;

  // No obligatorios

  /**
   * Dirección de apartamento.
   */
  @IsString()
  @IsOptional()
  department: string;

  /**
   * Compañía, si aplica.
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
   * Teléfono de habitación.
   */
  @IsString()
  @IsOptional()
  homephone: string;

  /**
   * Dirección.
   */
  @IsOptional()
  @IsString()
  address: string;

  /**
   * Ciudad dónde se presta el servicio.
   */
  @IsOptional()
  @IsString()
  city: string;

  /**
   * Estado dónde se presta el servicio.
   */
  @IsOptional()
  @IsString()
  state: string;

  /**
   * País, si llegara a aplicar. Por defecto la APi coloca "Venezuela"  en el campo.
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
   * Notas que sean útiles sobre el usuario del servicio.
   */
  @IsOptional()
  @IsString()
  notes: string;

  /**
   * Se desconoce la intención de este campo.
   */
  @IsOptional()
  @IsString()
  changeuserinfo: string;

  /**
   * Se desconoce la intención de este campo.
   */
  @IsOptional()
  @IsString()
  portalloginpassword: string;

  /**
   * Se desconoce la intención de este campo.
   */
  @IsOptional()
  @IsNumber()
  enableportallogin: number;
}
