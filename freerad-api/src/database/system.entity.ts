import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
import { ZonaCliente } from 'src/database/node.entity';

@Entity({ name: 'system' })
export class System {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 250, unique: true })
  apiKey: string;

  @Column({ type: 'varchar', length: 250, unique: true })
  endPoint: string;

  @ManyToMany(() => ZonaCliente, (node) => node.systems, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  nodes?: ZonaCliente[];
}
