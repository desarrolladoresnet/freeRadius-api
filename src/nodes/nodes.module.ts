import { Module } from '@nestjs/common';
import { NodesService } from './nodes.service';
import { NodesController } from './nodes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { System } from 'src/systems/entities/system.entity'
import { Node } from './entities/node.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([System, Node ])],
  controllers: [NodesController],
  providers: [NodesService]
})
export class NodesModule {}
