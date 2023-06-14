import { Table, Column, Model, DataType, Unique } from 'sequelize-typescript';

/**
 * Modelo de la tabla 'userinfo'.
 */
@Table({ tableName: 'userinfo', timestamps: false })
export class UserInfo extends Model {
  /**
   * id en numeros enteros, autoincremental.
   */
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id',
  })
  id: number;
  /**
   * Nombre de usuario.
   */
  @Column({ type: DataType.STRING(128), field: 'username', unique: true })
  username: string;
  /**
   * Nombre legarl
   */
  @Column({ type: DataType.STRING(200), field: 'firstname' })
  firstname: string;
  /**
   * Apellido
   */
  @Column({ type: DataType.STRING(200), field: 'lastname' })
  lastname: string;
  /**
   * Correo electronico/
   */
  @Column({ type: DataType.STRING(200), field: 'email' })
  email: string;
  //* La matoria de lo siguientes aprametros son solocados como opcionales.

  /**
   * @ignore
   */
  @Column({ type: DataType.STRING(200), field: 'department' })
  department: string;

  /**
   * @ignore
   */
  @Column({ type: DataType.STRING(200), field: 'company' })
  company: string;

  /**
   * @ignore
   */
  @Column({ type: DataType.STRING(200), field: 'workphone' })
  workphone: string;

  /**
   * @ignore
   */
  @Column({ type: DataType.STRING(200), field: 'homephone' })
  homephone: string;

  /**
   * @ignore
   */
  @Column({ type: DataType.STRING(200), field: 'mobilephone' })
  mobilephone: string;

  /**
   * @ignore
   */
  @Column({ type: DataType.STRING(200), field: 'address' })
  address: string;

  /**
   * @ignore
   */
  @Column({ type: DataType.STRING(200), field: 'city' })
  city: string;

  /**
   * @ignore
   */
  @Column({ type: DataType.STRING(200), field: 'state' })
  state: string;
  /**
   * Este parametro se coloca por defecto como Venezuela.
   */
  @Column({ type: DataType.STRING(100), field: 'country' })
  country: string;

  /**
   * @ignore
   */
  @Column({ type: DataType.STRING(200), field: 'zip' })
  zip: string;

  /**
   * String vacio.
   */
  @Column({ type: DataType.STRING(200), field: 'notes' })
  notes: string;

  /**
   * @ignore
   */
  @Column({ type: DataType.STRING(128), field: 'changeuserinfo' })
  changeuserinfo: string;

  /**
   * @ignore
   */
  @Column({
    type: DataType.STRING(128),
    field: 'portalloginpassword',
    defaultValue: '',
  })
  portalloginpassword: string;

  /**
   * @ignore
   */
  @Column({
    type: DataType.INTEGER,
    field: 'enableportallogin',
    defaultValue: 0,
  })
  enableportallogin: number;

  /**
   * @ignore
   */
  @Column({
    type: DataType.DATE,
    field: 'creationdate',
    defaultValue: DataType.NOW,
  })
  creationdate: Date;

  /**
   * Se pide un valor.
   */
  @Column({ type: DataType.STRING(128), field: 'creationby' })
  creationby: string;

  /**
   * El valor es creado automaticamente.
   */
  @Column({
    type: DataType.DATE,
    field: 'updatedate',
    defaultValue: DataType.NOW,
  })
  updatedate: Date;

  /**
   * El valor es creado automaticamente.
   */
  @Column({ type: DataType.STRING(128), field: 'updateby' })
  updateby: string;
}
