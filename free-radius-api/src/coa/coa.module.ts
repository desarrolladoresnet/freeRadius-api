import { Module } from '@nestjs/common';
import { CoaService } from './coa.service';

@Module({
  providers: [CoaService],
})
export class CoaModule {}
