import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'zone' })
export class Zone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128, unique: true })
  name: string;

	@Column({ type: 'varchar', length: 32, unique: false })
  tlf: string;

	@Column({ type: 'varchar', length: 30, unique: false })
  codigo_zona: string;

	@Column({ type: 'int', unique: false })
  Nas: number;

	@Column({ type: 'varchar', length: 60, unique: false })
  coord: string;

}
