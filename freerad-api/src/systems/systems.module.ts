import { Module } from '@nestjs/common';
import { SystemsService } from './systems.service';
import { SystemsController } from './systems.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Node } from 'src/database/node.entity';
import { System } from '../database/system.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Node, System])],
  controllers: [SystemsController],
  providers: [SystemsService],
  exports: [SystemsService],
})
export class SystemsModule {}
