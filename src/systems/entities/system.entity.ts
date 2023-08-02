import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinTable, PrimaryColumn, JoinColumn } from 'typeorm';
import { Node } from 'src/nodes/entities/node.entity'

@Entity({name: 'system'})
export class System {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 250, unique: true })
  apiKey: string;

  @Column({ type: 'varchar', length: 250, unique: true })
  endPoint: string;

  @ManyToMany(
    () => Node,
    node => node.systems,
    {
      onDelete: 'CASCADE',
      onUpdate:'CASCADE'},
  )
  nodes?: Node[];

}
