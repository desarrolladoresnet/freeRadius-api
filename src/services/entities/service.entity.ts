import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { System } from 'src/systems/entities/system.entity'
import { Plan } from 'src/plan/entities/plan.entity'


@Entity({name: 'service'})
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => System, sys => sys.id)
  sys: System[];

  @Column({ type: 'bigint', unique: true })
  clientId: number;

  @ManyToOne(() => Plan, plan => plan.id)
  plan: Plan[];

  @Column({ type: 'bigint', unique: true })
  radiusId: number;

  @Column({ type: 'int' })
  status: number; //0: Instalacion, 1: Activo, 2: Suspendido, 3: Cancelado, 4: Gratis
}