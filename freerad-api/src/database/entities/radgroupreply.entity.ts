/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany } from 'typeorm';
import { Service } from './service.entity';

@Entity({ name: 'radgroupreply' })
export class RadGroupReply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, nullable: false })
  groupname: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  attribute: string;

  @Column({ length: 2, nullable: false, default: ':=' })
  op: string;

  @Column({ type: 'varchar', length: 253, nullable: false })
  value: string;

  @JoinColumn()
  @OneToMany(() => Service,
  service => service.radGroup,
  {
    //onDelete: 'CASCADE',
    onUpdate:'CASCADE'},)
  services?: Service[]
}