import { Service } from 'src/services/entities/service.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, JoinColumn } from 'typeorm';


@Entity('plan')
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 200, unique: true })
  listName: string;
  
  @JoinColumn()
  @OneToMany(() => Service,
  service => service.radGroup,
  {
    onDelete: 'CASCADE',
    onUpdate:'CASCADE'},)
  services?: Service[]
}
