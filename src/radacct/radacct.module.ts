import { Module } from '@nestjs/common';
import { RadacctService } from './radacct.service';
import { RadacctController } from './radacct.controller';
import { Radacct } from './entities/radacct.entity';

@Module({
  //imports: [ Radacct ],
  controllers: [RadacctController],
  providers: [RadacctService]
})
export class RadacctModule {}
