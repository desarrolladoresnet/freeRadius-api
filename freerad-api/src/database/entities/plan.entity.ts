/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany } from 'typeorm';
import { Service } from './service.entity';

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


/**
 * Query para crear la tabla
 * --------------------------
  CREATE TABLE `nest`.`plan` (
  `id`  INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NULL,
  `listName` VARCHAR(200) NULL,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  UNIQUE INDEX `listName_UNIQUE` (`listName` ASC) VISIBLE);
 *
 */