/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'radcheck' })
export class RadCheck {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  attribute: string;

  @Column({ length: 2, nullable: false, default: ':=' })
  op: string;

  @Column({ type: 'varchar', length: 253, nullable: false })
  value: string;
}
