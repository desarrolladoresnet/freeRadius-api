import { Module } from '@nestjs/common';
import { RadcheckController } from './radcheck.controller';
import { RadcheckService } from './radcheck.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RadCheck } from 'src/database/radcheck.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RadCheck])],
  controllers: [RadcheckController],
  providers: [RadcheckService],
})
export class RadcheckModule {}
