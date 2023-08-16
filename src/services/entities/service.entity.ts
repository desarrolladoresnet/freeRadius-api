import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, JoinTable } from 'typeorm';
import { System } from 'src/systems/entities/system.entity'
import { RadGroupReply } from 'src/radgroupreply/entities/radgroupreply.entity';


@Entity({name: 'service'})
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => System, sys => sys.id)
  sys: System[];

  @Column({ type: 'bigint' })
  clientId: number;

  @ManyToOne(() => RadGroupReply, radgroupreply => radgroupreply.id,{ cascade:true,
    //onDelete: 'CASCADE',
    onUpdate:'CASCADE'})
  radGroup: RadGroupReply;

  @Column({ type: 'bigint', unique: true })
  radiusId: number;

  @Column({ type: 'int' })
  status: number; //0: Instalacion, 1: Activo, 2: Suspendido, 3: Cancelado, 4: Gratis
}
