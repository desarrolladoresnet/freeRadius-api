/* eslint-disable prettier/prettier */
import { Table, Column, Model, DataType } from 'sequelize-typescript';

/**
 * Modelo de la tabla 'radcheck'.
 */
@Table({ tableName: 'radcheck',  timestamps: false  })
export class RadCheck extends Model {
  /**
   * id en numeros enteros, autoincremental.
   */
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, })
  id: number;
  /**
   * Nombre del usuario asociado.
   */
  @Column({ type: DataType.STRING(64), allowNull: false })
  username: string;
  /**
   * ????
   */
  @Column({ type: DataType.STRING(64), allowNull: false })
  attribute: string;
  /**
  * ???? 
  */
  @Column({ type: DataType.CHAR(2), allowNull: false, defaultValue: '==' })
  op: string;
  /**
   * ???
   */
  @Column({ type: DataType.STRING(253), allowNull: false })
  value: string;
}
