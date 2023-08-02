import { Module } from '@nestjs/common';
import { RadusergroupController } from './radusergroup.controller';
import { RadusergroupService } from './radusergroup.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RadUserGroup } from 'src/database/radusergroup.entity';

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
