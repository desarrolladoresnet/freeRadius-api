import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
//* ENTIDADES *//
import { Nas } from './entities/nas.entity';
import { RadCheck } from './entities/radcheck.entity';
import { Radacct } from './entities/radacct.entity';
import { Plan } from './entities/plan.entity';
import { Service } from './entities/service.entity';
import { System } from './entities/system.entity';
import { RadUserGroup } from './entities/radusergroup.entity';
import { UserInfo } from './entities/user.entity';
import { ZonaCliente } from './entities/node.entity';
import { Zone } from './entities/zone.entity';
import { RadGroupReply } from './entities/radgroupreply.entity';

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
