import { Table, Column, Model, DataType } from 'sequelize-typescript';

/**
 * Modelo de la tabla 'radusergroup'.
 */
@Table({ tableName: 'radusergroup', timestamps: false })
export class UserGroup extends Model {
  /**
   * Nombre del usuario asociado.
   */
  @Column({ type: DataType.STRING(128), field: 'username', primaryKey: true })
  username: string;
  /**
   * Asociado al plan de servicio contratado.
   */
  @Column({ type: DataType.STRING(200), field: 'groupname' })
  groupname: string;
  /**
   * ????
   */
  @Column({
    type: DataType.INTEGER,
    field: 'priority',
  })
  priority: number;
}
