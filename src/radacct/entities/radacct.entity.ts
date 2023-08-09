import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'radacct' })
export class Radacct {
    @PrimaryGeneratedColumn()
    radacctid: number;

    @Column({ type: 'varchar', length:64, unique: true })
    acctsessionid: string; // Para el Ip

    @Column({ type: 'varchar', length: 32, unique: true })
    acctuniqueid: string;

	@Column({ type: 'varchar', length: 64, unique: false })
    username: string;

    @Column({ type: 'varchar', length: 64, unique: false })
    realm: string;

    @Column({ type: 'varchar', length: 15, unique: false })
    nasipaddress: string;

    @Column({ type: 'varchar', length: 100, unique: false })
    nasportid: string;

    @Column({ type: 'varchar', length: 32, unique: false })
    nasporttype: string;

    @Column({ type: 'datetime', nullable: true })
    acctstarttime: Date;

    @Column({ type: 'datetime', nullable: true })
    acctstoptime: Date;

    @Column({type: 'int', unique:false})
    acctinterval: number;

    @Column({type: 'int', unique: true})
    acctsessiontime: number;

    @Column({ type: 'varchar', length: 32, unique: false })
    acctauthentic: string;

    @Column({ type: 'varchar', length: 50, unique: false })
    connectinfo_start: string;

    @Column({ type: 'varchar', length: 50, unique: false })
    connectinfo_stop: string;

    @Column({ type: 'bigint'})
    acctinputoctets: number

    @Column({ type: 'bigint'})
    acctoutputoctets: number

    @Column({ type: 'varchar', length: 50, unique: false })
    calledstationid: string;

    @Column({ type: 'varchar', length: 50, unique: false })
    callingstationid: string;

    @Column({ type: 'varchar', length: 32, unique: false })
    acctterminatecause: string;

    @Column({ type: 'varchar', length: 32, unique: false })
    servicetype: string;

    @Column({ type: 'varchar', length: 32, unique: false })
    framedprotocol: string;

    @Column({ type: 'varchar', length: 15, unique: false })
    framedipaddress: string;

    @Column({ type: 'varchar', length: 45, unique: false })
    framedipv6address: string;

    @Column({ type: 'varchar', length: 45, unique: false })
    framedipv6prefix: string;

    @Column({ type: 'varchar', length: 44, unique: false })
    framedinterfaceid: string;

    @Column({ type: 'varchar', length: 44, unique: false })
    delegatedipv6prefix: string;
}
