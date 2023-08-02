import { Module } from '@nestjs/common';
import { RadcheckService } from './radcheck.service';
import { RadcheckController } from './radcheck.controller';
import { RadCheck } from './entities/radcheck.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([RadCheck])],
  controllers: [RadcheckController],
  providers: [RadcheckService]
})
export class RadcheckModule {}
