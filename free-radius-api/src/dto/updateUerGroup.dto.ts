/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator';

/**
 * Intefaz para modificar la tabla "radusergroup".
 */
export class UpdateUserGroupDto {
  /**
   * Nombre de usuario asociado a un servicio.
   */
  @IsNotEmpty()
  @IsString()
  username: string;

  /**
   * Tipo de servicio asociado al usuario.
   */
  @IsOptional()
  @IsString()
  groupname: string;

  /**
   * Prioridad de servicio.
   */
  @IsOptional()
  @IsNumber()
  priority: number;
}
