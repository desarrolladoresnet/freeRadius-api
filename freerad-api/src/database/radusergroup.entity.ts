/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('radusergroup')
export class RadUserGroup {
  @PrimaryGeneratedColumn()
  username: string;

  @Column({ type: 'varchar', length: 200 })
  groupname: string;

  @Column({ type: 'int' })
  priority: number;
}
