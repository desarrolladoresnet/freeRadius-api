/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { System } from 'src/database/system.entity'

@Entity()
export class ZonaCliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @JoinTable()
  @ManyToMany(
    () => System, 
    system => system.nodes,
    {onDelete: 'CASCADE',
      onUpdate:'CASCADE'})
  systems?: System[]
}