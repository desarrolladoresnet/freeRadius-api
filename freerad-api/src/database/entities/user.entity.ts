import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  username: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  rol: string;

  @Column({ type: 'boolean', nullable: true })
  active: boolean;

  @Column({ type: 'date', nullable: true })
  create_at: Date;

  @Column({ type: 'varchar', length: 20, nullable: true })
  create_by: string;

  @Column({ type: 'date', nullable: true })
  update_at: Date;

  @Column({ type: 'varchar', length: 20, nullable: true })
  update_by: string;

  @Column({ type: 'date', nullable: true })
  last_login: Date;
}
