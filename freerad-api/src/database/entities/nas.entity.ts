/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'nas' })
export class Nas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128, unique: true })
  nasname: string;

	@Column({ type: 'varchar', length: 32, unique: true })
  shortname: string;

	@Column({ type: 'varchar', length: 30, unique: false })
  type: string;

	@Column({ type: 'int', unique: false })
  ports: number;

	@Column({ type: 'varchar', length: 60, unique: false })
  secret: string;

	@Column({ type: 'varchar', length: 64, unique: false })
  server: string;

	@Column({ type: 'varchar', length: 50, unique: false })
  community: string;

	@Column({ type: 'varchar', length: 200, unique: false })
  description: string;
}