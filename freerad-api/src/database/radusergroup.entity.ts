/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('radusergroup')
export class UserGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128 })
  username: string;

  @Column({ type: 'varchar', length: 200 })
  groupname: string;

  @Column({ type: 'int' })
  priority: number;
}
