/* eslint-disable prettier/prettier */
import { IsArray } from 'class-validator';

/**
 * Este DTO se usa para recibir un array de string con los parametros de busqueda para los search de las tablas. 
 */
export class SearchDto {
  /**
   * Objeto que contiene un array de string
   * @example query = {["string", "string", "string", ....]}
   */
  @IsArray()
  query: Array<string>;
}
