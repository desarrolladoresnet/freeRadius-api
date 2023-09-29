import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
//* ENTIDADES *//
import {
  Nas,
  RadCheck,
  Radacct,
  Plan,
  Service,
  System,
  RadUserGroup,
  User,
  UserInfo,
  ZonaCliente,
  Zone,
  RadGroupReply,
} from './entities/index';

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
          User,
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
