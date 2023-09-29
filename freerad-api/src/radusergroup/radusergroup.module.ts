import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RadusergroupController } from './radusergroup.controller';
import { RadusergroupService } from './radusergroup.service';
import { RadUserGroup } from 'src/database/entities/index';

/**
 * Modulo para la tabla "radusergroup".
 * Controla el estado del servicio de un usuario.
 * La tabla necesita ser alterada, ver comentario en el controller.
 */
@Module({
  imports: [TypeOrmModule.forFeature([RadUserGroup])],
  controllers: [RadusergroupController],
  providers: [RadusergroupService],
})
export class RadusergroupModule {}
