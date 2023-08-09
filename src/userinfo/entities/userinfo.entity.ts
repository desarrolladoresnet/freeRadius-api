import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'userinfo' })
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 200 })
  firstname: string;

  @Column({ type: 'varchar', length: 200 })
  lastname: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  department: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  company: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  workphone: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  homephone: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  mobilephone: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  state: string;

  @Column({ type: 'varchar', length: 100, default: 'Venezuela' })
  country: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  zip: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  notes: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  changeuserinfo: string;

  @Column({ type: 'varchar', length: 128, default: '' })
  portalloginpassword: string;

  @Column({ type: 'int', default: 0 })
  enableportallogin: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  creationdate: Date;

  @Column({ type: 'varchar', length: 128 })
  creationby: string;

  @Column({ type: 'datetime', nullable: true })
  updatedate: Date;

  @Column({ type: 'varchar', length: 128 })
  updateby: string;
}
