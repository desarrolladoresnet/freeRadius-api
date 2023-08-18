import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
//* ENTIDADES *//
import { Nas } from './entities/nas.entity';
import { RadCheck } from './radcheck.entity';
import { Radacct } from './radacct.entity';
import { Plan } from './plan.entity';
import { Service } from './service.entity';
import { System } from './system.entity';
import { RadUserGroup } from './radusergroup.entity';
import { UserInfo } from './user.entity';
import { ZonaCliente } from './node.entity';
import { Zone } from './zone.entity';
import { RadGroupReply } from './radgroupreply.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      // Use useFactory, useClass, or useExisting
      // to configure the DataSourceOptions.
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('HOST'),
        port: configService.getOrThrow('DBPORT'),
        username: configService.getOrThrow('USER'),
        password: configService.getOrThrow('PASSWORD'),
        database: configService.getOrThrow('DB'),
        entities: [
          Nas,
          Plan,
          Radacct,
          RadCheck,
          RadGroupReply,
          RadUserGroup,
          Service,
          System,
          UserInfo,
          ZonaCliente,
          Zone,
        ],
        synchronize: false,
      }),
      inject: [ConfigService],
      // dataSource receives the configured DataSourceOptions
      // and returns a Promise<DataSource>.
    }),
  ],
})
export class DatabaseModule {}
