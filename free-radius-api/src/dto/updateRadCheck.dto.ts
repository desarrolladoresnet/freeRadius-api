/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsString,
  IsOptional,
	IsInt,
} from 'class-validator';

/**
 * Interfaz que verifica los datos recibidos para hacer un update de cualquier fila de la tabla "radcheck".
 * El campos 'id' se obligatorio más un campo a modificar.
 */
export class UpdateRadCheckDto {

  /**
   * id en numeros enteros.
   */
	@IsInt()
	@IsNotEmpty()
	id: number;

  /**
   * Nombre de usuario asociado a un servicio.
   */
  @IsOptional()
  @IsString()
  username: string;

  /**
   * Función desconocida.
   * @todo Verificar la lista de atributos.
   */
  @IsOptional()
  @IsString()
  attribute: string;

  /**
   * Operación ejecutada por el servidor freeRadius.
   * @todo Verificar la lista de operaciones.
   */
  @IsOptional()
  @IsString()
  op: string;

  /**
   * Por definir.
   * @todo verificar la logica deseada para el atributo.
   */
  @IsOptional()
  @IsString()
  value: string;
}
